#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Copyright (c) 2008-2012 the MansOS team. All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are met:
#  * Redistributions of source code must retain the above copyright notice,
#    this list of  conditions and the following disclaimer.
#  * Redistributions in binary form must reproduce the above copyright
#   notice, this list of conditions and the following disclaimer in the
#   documentation and/or other materials provided with the distribution.
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
# AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
# IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
# ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS OR
# CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
# EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
# PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
# OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
# WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
# OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
# ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
#

import os
from os import path
from subprocess import Popen
from multiprocessing import Pipe, Process
import urllib2
import socket
import time
import webbrowser

pathToMansos = "../mansos"

def listen(pipe):
    DEBUG = False

    c = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    c.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

    port = 8080
    host = 'localhost'
    c.bind((host, port))
    c.listen(1)
    print ("Listening to {}:{}".format(host, port))
    while 1:
        csock, caddr = c.accept()
        start = time.time()
        line = csock.recv(1024).strip()
        new = line.decode().replace("&&", "##")

        if new.strip() == '':
            continue

        getStr = new[new.find(" /?") + 3:new.find("HTTP")]
        assert len(getStr), "not found in {}".format(new)

        # Parse GET
        get = dict()
        for x in getStr.split("&"):
            # TODO: fix possible errors on ?cmd&key or ?cmd=1=2&key=0
            k, v = x.split("=")
            get[k.strip()] = v.strip().replace("%20", " ").replace("{", "{\n").replace("}", "}\n").replace(";", ";\n").replace("##", "&&")
        if "sync" in get:
            pipe.send("Sync recieved")
        else:
            print get['code']
            get['code']
            upload(code = "use RedLed, period 100ms;", platform = "telosb")
        if DEBUG:
            print ("Incoming conection, parameters: {}".format(get))

        # Manage JSON callback
        cb = None
        if 'jsoncallback' in get:
            cb = get['jsoncallback']

        # Do magic
        response = 'Hello!'
        # Prepare data for response
        data = "{}{}('{}')".format('HTTP/1.0 200 OK\n\n', cb, response)

        # Respond
        csock.sendall(data.encode())

        csock.close()
        if DEBUG:
            print ("Processed in {}".format(time.time() - start))
        #getFile("file:///home/jj/work/blockly-read-only/demos/code/index.html")

def getFile(url, displayStatus = True):
    file_name = url.split('/')[-1]
    u = urllib2.urlopen(url)
    f = open(file_name, 'wb')
    meta = u.info()
    file_size = int(meta.getheaders("Content-Length")[0])
    print "Downloading: %s Bytes: %s" % (file_name, file_size)

    file_size_dl = 0
    block_sz = 8192
    while True:
        buf = u.read(block_sz)
        if not buf:
            break

        file_size_dl += len(buf)
        f.write(buf)
        if displayStatus:
            status = r"%10d  [%3.2f%%]" % (file_size_dl, file_size_dl * 100. / file_size)
            status = status + chr(8) * (len(status) + 1)
            print status,

    f.close()

def doPopen(target):
    upload = Popen(target)
    upload.wait()
    if upload.returncode != 0:
        print "Upload failed!"
        return
    print "Upload successful!"

def upload(code, filename = "temp.sl", platform = "telosb"):
    with open(filename, "w") as codeFile:
        codeFile.write(code)
    generateMakefile(filename)

    p1 = Process(target = doPopen, args = (["make", platform, "upload"],))
    p1.deamonic = True
    p1.name = "Upload thread"
    p1.start()

def generateMakefile(fileName = 'main.c', appName = 'blocky-SEAL-test'):
    global pathToMansos
    if not path.exists("Makefile") or not path.isfile("Makefile"):

        sourceType = "SEAL_SOURCES"
        if appName == '': appName = 'SealApp'

        print "Generating Makefile"
        with open("Makefile", "w") as out:
            out.write("""#-*-Makefile-*- vim:syntax=make
#
# --------------------------------------------------------------------
#  The developer must define at least SOURCES and APPMOD in this file
#
#  In addition, PROJDIR and MOSROOT must be defined, before including 
#  the main Makefile at ${MOSROOT}/mos/make/Makefile
# --------------------------------------------------------------------

# Sources are all project source files, excluding MansOS files
""" + sourceType + " = " + fileName + """

# Module is the name of the main module built by this makefile
APPMOD = """ + appName + """

# --------------------------------------------------------------------
# Set the key variables
PROJDIR = $(CURDIR)
ifndef MOSROOT
  MOSROOT = $(PROJDIR)/""" + path.relpath(pathToMansos) + """
endif

# Include the main makefile
include ${MOSROOT}/mos/make/Makefile
""")

if __name__ == '__main__':
    abs_path = os.path.abspath('.') #Absolute path of current working directory
    filename = os.path.join(abs_path, 'blockly-read-only/demos/maze/index.html')
    print 'Try to open ' + filename
    webbrowser.open(filename)

    con1, con2 = Pipe()
    p1 = Process(target = listen, args = (con2,))
    p1.daemon = False
    p1.name = "Socket listening thread"
    p1.start()
    lastSync = time.time()
    while p1.is_alive():
        if con1.poll(0.001):
            print con1.recv()
            lastSync = time.time()
        if time.time() - lastSync > 10:
            print "No sync for 10 sec.\nTerminating..."
            p1.terminate()
            break
