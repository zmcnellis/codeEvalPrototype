#!/bin/sh
set -ue

curl -qO http://llvm.org/releases/3.4/llvm-3.4.src.tar.gz
curl -qO http://llvm.org/releases/3.4/clang-3.4.src.tar.gz
curl -qO http://llvm.org/releases/3.4/compiler-rt-3.4.src.tar.gz

tar -zxf llvm-3.4.src.tar.gz
tar -zxf clang-3.4.src.tar.gz
tar -zxf compiler-rt-3.4.src.tar.gz

mv clang-3.4.src llvm-3.4.src/tools/clang
mv compiler-rt-3.4.src llvm-3.4.src/projects/compiler-rt

mkdir build
cd build
../llvm-3.4.src/configure --prefix=/app/vendor --disable-docs
make -sj4
make install
