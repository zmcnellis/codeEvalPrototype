from lxml import etree
from GAST import GAST
from ast import *
import os
import csv

class Python_Ast(GAST):

    def __init__(self, root, filename):
        self.root = root
        self.filename = filename
        reader = csv.reader(open(os.getcwd()+"/media/translation_python.csv", "r"), delimiter='\t')
        self.gast_dict = {rows[0]:rows[1] for rows in reader}
        self.py_ops = ["Add", "Sub", "Mult", "Div", "Mod", "Pow", "LShift", "RShift", "BitOr", "BitXor", "BitAnd", "FloorDiv", "Invert", "Not", "UAdd", "USub"]
        self.ops = ["+", "-", "*", "/", "%", "^", "<<", ">>", "|", "^", "&", "//", "~", "!", "+", "-"]

    def getRoot(self):
        return self.root

    def translate(self, node, name):
        if name in self.gast_dict:
            return self.gast_dict[name]
        else:
            return "UNKNOWN"


    def str_node(self, node, tag):
        if node.name == "BINARY_OPERATOR":
            tmp = etree.SubElement(node.tag, "BINARY_OPERATOR_META")
            tmp2 = etree.SubElement(tmp, "tor")
            tmp2.text = node.op.__class__.__name__
            #tmp2.text = self.ops[self.py_ops.index(node.op.__class__.__name__)]
            if hasattr(node.left, 'id'):
                tmp2 = etree.SubElement(tmp, "op")
                tmp2.text = str(node.left.id)
            elif hasattr(node.left, 'n'):
                tmp2 = etree.SubElement(tmp, "op")
                tmp2.text = str(node.left.n)
            elif hasattr(node.left, 's'):
                tmp2 = etree.SubElement(tmp, "op")
                tmp2.text = str(node.left.s)
            elif hasattr(node.left, 'value'):
                tmp2 = etree.SubElement(tmp, "op")
                tmp2.text = str(node.left.value)
            if hasattr(node.right, 'id'):
                tmp2 = etree.SubElement(tmp, "op")
                tmp2.text = str(node.right.id)
            elif hasattr(node.right, 'n'):
                tmp2 = etree.SubElement(tmp, "op")
                tmp2.text = str(node.right.n)
            elif hasattr(node.right, 's'):
                tmp2 = etree.SubElement(tmp, "op")
                tmp2.text = str(node.right.s)
            elif hasattr(node.right, 'value'):
                tmp2 = etree.SubElement(tmp, "op")
                tmp2.text = str(node.right.value)
        elif node.name == "UNARY_OPERATOR":
            tmp = etree.SubElement(node.tag, "UNARY_OPERATOR_META")
            tmp2 = etree.SubElement(tmp, "tor")
            tmp2.text = node.op.__class__.__name__
            #tmp2.text = self.ops[self.py_ops.index(node.op.__class__.__name__)]
            if hasattr(node.operand, 'id'):
                tmp2 = etree.SubElement(tmp, "op")
                tmp2.text = str(node.operand.id)
            elif hasattr(node.operand, 'n'):
                tmp2 = etree.SubElement(tmp, "op")
                tmp2.text = str(node.operand.n)
            elif hasattr(node.operand, 's'):
                tmp2 = etree.SubElement(tmp, "op")
                tmp2.text = str(node.operand.s)
            elif hasattr(node.operand, 'value'):
                tmp2 = etree.SubElement(tmp, "op")
                tmp2.text = str(node.operand.value)
        if isinstance(node, AST):
            if (len(node._attributes) == 2):
                tag.set("lineno", str(node.lineno))
                tag.set("col_offset", str(node.col_offset))

    def ast_visit(self, node, pnode=None, level=0):
        if (level == 0):
            node.name = self.translate(node, node.__class__.__name__)
            node.tag = etree.SubElement(self.root, node.name)
        else: 
            node.name = self.translate(node, node.__class__.__name__)
            node.tag = etree.SubElement(pnode.tag, node.name)
            self.str_node(node, node.tag)
        for field, value in iter_fields(node):
            if isinstance(value, list):
                for item in value:
                    if isinstance(item, AST):
                        self.ast_visit(item, node, level=level+1)
            elif isinstance(value, AST):
                self.ast_visit(value, node, level=level+1)

