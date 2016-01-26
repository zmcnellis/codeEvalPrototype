#!/bin/sh
set -ue

curl -qO http://llvm.org/releases/3.2/llvm-3.2.src.tar.gz
curl -qO http://llvm.org/releases/3.2/clang-3.2.src.tar.gz
curl -qO http://llvm.org/releases/3.2/compiler-rt-3.2.src.tar.gz

tar -zxf llvm-3.2.src.tar.gz
tar -zxf clang-3.2.src.tar.gz
tar -zxf compiler-rt-3.2.src.tar.gz

mv clang-3.2.src llvm-3.2.src/tools/clang
mv compiler-rt-3.2.src llvm-3.2.src/projects/compiler-rt

mkdir build
cd build
../llvm-3.2.src/configure --prefix=/app/vendor --disable-docs
make -sj4
make install
