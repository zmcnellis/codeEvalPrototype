#!/usr/bin/python

"""
Creates a generic ast for a Python or C++ program and saves the result to an XML file.
The resulting ast should be language independent.

Zachary McNellis (zmcnell ~AT~ clemson.edu), 2015-01-06
"""

from python_ast import Python_Ast
from cpp_ast import Cpp_Ast
from xml.etree import ElementTree as etree
from GAST import GAST
import clang.cindex
from ast import *
import time
import sys

# define global root tag of XML file
root = None

def evalCPP(inFileName, gast):
    # libclang init
    index = clang.cindex.Index.create()
    translation_unit = index.parse(inFileName)

    # generate ast
    gast.ast_visit(translation_unit.cursor)
    #program = gast.get_info(translation_unit.cursor)
    #gast.write_xml(program)

def evalPython(inFileName, fstr, gast):
    # generate ast
    gast.ast_visit(parse(fstr, filename=inFileName)) 

if __name__ == '__main__':
    # get input and output file names from console
    inFileName = sys.argv[1]
    outFileName = sys.argv[2]

    # read input file to string
    inFile = open(inFileName, 'r')
    fstr = inFile.read()
    inFile.close()

    # get file extension
    fileType = inFileName[inFileName.rfind('.')+1:]
    root = etree.Element("gast")
   
    gast = None
 
    if fileType == "cpp":
        gast = Cpp_Ast(root, inFileName)
        evalCPP(inFileName, gast)
    elif fileType == "py":
        gast = Python_Ast(root, inFileName)
        evalPython(inFileName, fstr, gast)
    else:
        print "ERROR: Invalid file type"
        exit()

    # write ast to xml file
    outFile = open(outFileName, "w")
    outFile.write("<?xml version=\"1.0\"?>\n")
    outFile.write(etree.tostring(gast.getRoot()))
    outFile.close()

    print "Done."
