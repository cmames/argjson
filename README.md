# argjson


[![GitHub license](https://img.shields.io/github/license/cmames/argjson)](https://github.com/cmames/argjson/blob/main/LICENSE)
![GitHub last commit](https://img.shields.io/github/last-commit/cmames/argjson)

![GitHub top language](https://img.shields.io/github/languages/top/cmames/argjson)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/cmames/argjson)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/cmames/argjson)

![Code Grade](https://www.code-inspector.com/project/30015/score/svg)
![Code Grade](https://www.code-inspector.com/project/30015/status/svg)


:uk: an argument parser for node.js 
> :fr: un parser d'arguments pour node.js.

<a href="https://github.com/cmames/argjson">https://github.com/cmames/argjson</a>

---
### Why

it's always useful and avoids having to code everything according to the types and number of arguments.

> ### Pourquoi
>
> c'est toujours utile et ça évite d'avoir à tout coder en fonction des types et du nombre d'argument.

---
### Installation
```
npm install argjson
```
> ### Installation
> ```
> npm install argjson
> ```

---
### Usage

import the package in your node file
```
const argjson=require("argjson");
```
create your menu options by calling the add method
```
argjson.add({
        arg: "file",
        short: "f",
        description: "file to open",
        default:""
});
```
arg : the name of the argument

short : the short name of the argument

description : the description of the argument

default : the default value of the argument


In the previous example we created the argument --file or -f 

For on/off arguments like verbose we can do
```
argjson.add({
        arg: "verbose",
        short: "v",
        description: "verbose mode",
        default:false
});
```
in this case and only in this case default is optional and we have created --verbose or -v

-v will be different from -V

the --help or -h argument is already defined by default and displays the help

you can concatenate the short arguments 

-a -b -c is equivalent to -abc
-a -b -c -f myfile is equivalent to -abcf myfile

you can pass arrays and json as arguments
```
argjson.add({
        arg: "tab",
        short: "t",
        description: "array",
        default:[]
});
argjson.add({
        arg: "json",
        short: "j",
        description: "json",
        default:{}
});
```
once the arguments are defined, you just have to launch the parser
```
var argv=argjson.parse();
```
then you find in argv all the arguments with their long name
```
argv.file
argv.verbose
argv.tab
argv.json
```
the syntax argv["file"] also works

example of use
```
node myfile.js --file test.txt --tab "[1, 3, 5, 42]" --size 1024 --factor 1.27 -vxc
```

> Utilisation
> 
> importez le paquet dans votre fichier node
> ```
> const argjson=require("argjson");
> ```
> créez vos option de menu en appelant la méthode add
> ```
> argjson.add({
>         arg: "file",
>         short:"f",
>         description:"file to open",
>         default:""
> });
> ```
> arg : le nom de l'argument
> 
> short : le nom court de l'argument
> 
> description : la description de l'argument
> 
> default : la valeur par défaut de l'argument
> 
> Dans l'exemple précédent on a créé l'argument --file ou -f 
> 
> Pour des arguments on/off comme verbose on peut faire
> ```
> argjson.add({
>         arg: "verbose",
>         short:"v",
>         description:"verbose mode",
>         default:false
> });
> ```
> dans ce cas et seulement dans ce cas default est facultatif et on a créé --verbose ou -v
> 
> -v sera différent de -V
> 
> l'argument --help ou -h est déjà défini par défaut et affiche l'aide
> 
> vous pouvez concaténer les arguments courts 
> 
> -a -b -c est équivalent à -abc
> -a -b -c -f monfichier est equivalent à -abcf monfichier
> 
> vous pouvez passer comme argument des tableaux et des json
> ```
> argjson.add({
>         arg: "tab",
>         short:"t",
>         description:"array",
>         default:[]
> });
> argjson.add({
>         arg: "json",
>         short:"j",
>         description:"json",
>         default:{}
> });
> ```
> une fois les arguments définis il suffit de lancer le parser
> ```
> var argv=argjson.parse();
> ```
> vous retrouvez alors dans argv tous les arguments avec leur nom long
> ```
> argv.file
> argv.verbose
> argv.tab
> argv.json
> ```
> la syntaxe argv["file"] fonctionne aussi
> 
> exemple d'utilisation
> ```
> node monfichier.js --file test.txt --tab "[1, 3, 5, 42]" --size 1024 --factor 1.27 -vxc
> ```
