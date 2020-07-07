#!/bin/bash -e
SCRIPT_DIR=$(dirname $(readlink -f $0))

VERSION_LIST=$(ls -1 $SCRIPT_DIR/specs)

rm -fr obj/
rm -fr _site/
