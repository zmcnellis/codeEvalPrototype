from lxml import etree
from GAST import GAST
import clang.cindex

class Cpp_Ast(GAST):

    def __init__(self, root, filename):
        self.root = root
        self.filename = filename
        self.ignore = ["(", ")", ";", "{", "}"]
        self.ops = ["++", "--", "~", "!", "+", "-", "&", "*", "%", "/", "<<", ">>", "<", ">", "<=", ">=", "==", "!=", "&", "^", "|", "&&", "||", "=", "*=", "/=", "%=", "+=", "-=", ">>=", "<<=", "&=", "^=", "|=", "?", ":"]

    def getRoot(self):
        return self.root

    def str_node(self, node, tag):
        tag.set("lineno", str(node.location.line))
        tag.set("col_offset", str(node.location.column))
    
        tokenNum = opNum =  0

        if str(node.kind)[str(node.kind).index('.')+1:] == "BINARY_OPERATOR":
            tmp = etree.SubElement(tag, "BINARY_OPERATOR_META")

        if str(node.kind)[str(node.kind).index('.')+1:] == "UNARY_OPERATOR":
            tmp = etree.SubElement(tag, "UNARY_OPERATOR_META")

        tokenNum = 0
        for x in node.get_tokens():
            identifier = str(x.kind)[:str(x.kind).index('.')+1]
            if x.spelling in self.ignore:
                continue
            '''if identifier == "LITERAL":
                tag.set("token"+str(tokenNum), x.spelling)
            if identifier == "KEYWORD":
                tag.set("token"+str(tokenNum), x.spelling)'''
            if str(node.kind)[str(node.kind).index('.')+1:] == "BINARY_OPERATOR":
                if x.spelling in self.ops:
                    tmp2 = etree.SubElement(tmp, "tor")
                    tmp2.text = x.spelling
                else:
                    tmp2 = etree.SubElement(tmp, "op")
                    tmp2.text = x.spelling
            if str(node.kind)[str(node.kind).index('.')+1:] == "UNARY_OPERATOR":
                if x.spelling in self.ops:
                    tmp2 = etree.SubElement(tmp, "tor")
                    tmp2.text = x.spelling
                else:
                    tmp2 = etree.SubElement(tmp, "op")
                    tmp2.text = x.spelling
            #tag.set("token"+str(tokenNum), str(x.kind)[str(x.kind).index('.')+1:])
            #print x.kind
            #print "  '" + str(x.spelling) + "'" '''

    def ast_visit(self, node, pnode=None, level=0):
        identifier = str(node.kind)[:str(node.kind).index('.')]
        kind = str(node.kind)[str(node.kind).index('.')+1:]
        if level == 0:
            node.tag = etree.SubElement(self.root, kind)
        else:
            node.tag = etree.SubElement(pnode.tag, kind)
            self.str_node(node, node.tag)

        if identifier == "CursorKind":
            for c in node.get_children():
                if str(c.location.file) == self.filename:
                    self.ast_visit(c, node, level=level+1)

