#!/usr/bin/python

"""
Calculates the cyclomatic complexity for a given GAST representation

Zachary McNellis (zmcnell ~AT~ clemson.edu), 2015-01-06
"""

import sys
import time
from xml.etree import ElementTree as etree
from StringIO import StringIO

difficulty = 0

eta_1 = 0 #distinct operators
eta_2 = 0 #distinct operands
N_1 = 0   #total operators
N_2 = 0   #total operands

if __name__ == "__main__":
    # get input file name from console
    inFileName = raw_input("Enter name of the xml file: ")
    if inFileName == "":
        inFileName = "cpp_ast.xml"

    # read input file
    inFile = open(inFileName, 'r')
    xml = inFile.read()
    inFile.close()

    # parse xml tree
    tree = etree.parse(StringIO(xml))
    context = etree.iterparse(StringIO(xml))
    randSet = set()
    torSet = set()
    for action, elem in context:
        if elem.tag == "BinaryOperator":
            N_1 += 1
            N_2 += 2
        elif elem.tag == "UnaryOperator":
            N_1 += 1
            N_2 += 1
        elif elem.tag == "COMPOUND_ASSIGN_OPERATOR":
            N_1 += 2
            N_2 += 3
        elif elem.tag == "VAR_DECL":
            N_1 += 1
            N_2 += 2
        elif elem.tag == "BinaryOperatorMeta":
            for child in elem:
                if child.tag == "rand":
                    randSet.add(child.text)
                elif child.tag == "tor":
                    torSet.add(child.text)
        elif elem.tag == "UnaryOperatorMeta":
            for child in elem:
                if child.tag == "rand":
                    randSet.add(child.text)
                elif child.tag == "tor":
                    torSet.add(child.text)
    eta_1 = max(len(torSet), 1)
    eta_2 = max(len(randSet), 1)
    difficulty = (eta_1 / 2.0) * (N_2 / eta_2)

    print "distinct operators:\t"+str(eta_1)
    print "distinct operands:\t"+str(eta_2)
    print "total operators:\t"+str(N_1)
    print "total operands: \t"+str(N_2)
    print "Halstead Difficulty =>\t"+str(difficulty)
