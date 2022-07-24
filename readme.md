# How To Start This App?

It needs back-end tech, but this repo only have website, to start this website please follow steps below.

1. copy .env_example to create .env file, input your api url.
2. install node_module and update, then start project.

```
    yarn install
    yarn upgrade
    yarn start
```

if there's warning message when install, probably because node version like this.

```
    Error: Node Sass does not yet support your current environment: Windows 64-bit with Unsupported runtime (88)
    For more information on which environments are supported please see:
    https://github.com/sass/node-sass/releases/tag/v4.14.1
```

please change your node version to match your environment like:

```
    nvm use 14
```

and continue to start your application.
