from xml.etree import ElementTree as etree
from GAST import GAST
import clang.cindex
from clang.cindex import CursorKind
import csv
import os

class Cpp_Ast(GAST):

    def __init__(self, root, filename):
        self.root = root
        self.filename = filename
        reader = csv.reader(open(os.getcwd()+"/media/translation_cpp.csv", "r"), delimiter='\t')
        self.gast_dict = {rows[0]:rows[1] for rows in reader}
        self.ignore = ["(", ")", ";", "{", "}"]
        self.ops = ["++", "--", "~", "!", "+", "-", "&", "*", "%", "/", "<<", ">>", "<", ">", "<=", ">=", "==", "!=", "&", "^", "|", "&&", "||", "=", "*=", "/=", "%=", "+=", "-=", ">>=", "<<=", "&=", "^=", "|=", "?", ":"]
        self.branchList = ["if", "while", "for", "case"]
        self.totalBranches = 0

    def getRoot(self):
        return self.root

    def translate(self, node, name):
        if name in self.gast_dict:
            return self.gast_dict[name]
        else:
            return "Unknown"

    def str_node(self, node, tag):
        tag.set("lineno", str(node.location.line))
        tag.set("col_offset", str(node.location.column))
    
        tokenNum = opNum = 0

        if node.label == "BinaryOperator":
            tmp = etree.SubElement(tag, "BinaryOperatorMeta")

        if node.label == "UnaryOperator":
            tmp = etree.SubElement(tag, "UnaryOperatorMeta")

        tokenNum = 0
        branchCount = 0
        for x in node.get_tokens():
            identifier = str(x.kind)[:str(x.kind).index('.')+1]
            if x.spelling in self.ignore:
                continue
            if ((node.kind == CursorKind.CXX_METHOD or
               node.kind == CursorKind.FUNCTION_DECL or
               node.kind == CursorKind.CONSTRUCTOR)
               and node.is_definition()):
               
               if x.spelling in self.branchList:
                   tag.set("mccabe", str(int(tag.get("mccabe", default="0"))+1))

            if node.label == "BinaryOperator":
                if x.spelling in self.ops:
                    tmp2 = etree.SubElement(tmp, "tor")
                    tmp2.text = x.spelling
                else:
                    tmp2 = etree.SubElement(tmp, "rand")
                    tmp2.text = x.spelling
            if node.label == "UnaryOperator":
                if x.spelling in self.ops:
                    tmp2 = etree.SubElement(tmp, "tor")
                    tmp2.text = x.spelling
                else:
                    tmp2 = etree.SubElement(tmp, "rand")
                    tmp2.text = x.spelling

    def ast_visit(self, node, pnode=None, level=0):
        identifier = str(node.kind)[:str(node.kind).index('.')]
        kind = str(node.kind)[str(node.kind).index('.')+1:]
        node.label = self.translate(node, kind)
        if level == 0:
            node.tag = etree.SubElement(self.root, node.label)
        else:
            node.tag = etree.SubElement(pnode.tag, node.label)
            self.str_node(node, node.tag)

        if identifier == "CursorKind":
            for c in node.get_children():
                if str(c.location.file) == self.filename:
                    self.ast_visit(c, node, level=level+1)

    def fix_ops(self):
        for tags in self.root.iter('BinaryOperator'):
            tags.append(tags[0])

        for tags in self.root.iter('UnaryOperator'):
            tags.append(tags[0])
            
