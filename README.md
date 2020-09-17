# TizenFX Docs

Building TizenFX API Reference


## Prerequisites
- .NET Core SDK >= 3.1 : https://dotnet.microsoft.com/download
- DocFX >= 2.56 : https://dotnet.github.io/docfx/ 

## Build all documents
```sh
$ ./build.sh
```

## Build only documents for internals modules
```sh
$ ./build.sh clone
$ ./build.sh restore
$ docfx docfx_internals.json
```

## Serve local built documents
```
$ docfx serve _site
``
