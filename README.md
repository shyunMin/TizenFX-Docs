# TizenFX Docs

Building TizenFX API Reference


## Prerequisites
- .NET Core SDK >= 3.1 : https://dotnet.microsoft.com/download
- DocFX >= 2.56 : https://dotnet.github.io/docfx/

## Build documents
```sh
$ ./build.sh
```

## Build documents with the specific docfx file
```sh
# Build documents for internals API
$ DOCFX_FILE=docfx_internals.json ./build.sh

# Build documents for docs.tizen.org
$ DOCFX_FILE=docfx_docs.tizen.org.json ./build.sh

```

## Serve local built documents
```
$ docfx serve _site
``
