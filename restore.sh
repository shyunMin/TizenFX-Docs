#!/bin/bash -e
SCRIPT_DIR=$(dirname $(readlink -f $0))

VERSION_LIST=$(ls -1 $SCRIPT_DIR/repos)

TEMP_SLN_NAME="_tizenfx_public"
TEMP_SLN_FILE="$TEMP_SLN_NAME.sln"

for v in $VERSION_LIST; do
  pushd "$SCRIPT_DIR/repos/$v"
  # make temp solution file
  rm -f $TEMP_SLN_FILE
  dotnet new sln -n $TEMP_SLN_NAME
  dotnet sln $TEMP_SLN_FILE add src/**/*.csproj

  # restore solution
  dotnet restore $TEMP_SLN_FILE

  # clean up
  rm -f $TEMP_SLN_FILE
  popd
done
