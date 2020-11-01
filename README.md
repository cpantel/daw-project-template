![header](doc/header.png)

# Trabajo práctico

Autor:

* Carlos Pantelides

# Descripción

El sistema provee administración sobre dispositivos actuadores de tipo binario. Permite dar de alta (mediante CLI), modificar algunas características de los dispositivos y prenderlos o apagarlos.

Consiste en un backend que utiliza una base de datos MySQL como persistencia y un frontend web no autenticado.


# Detalles Frontend 

El frontend permite listar y editar dispositivos y prenderlos y apagarlos.

Si hubiera acceso concurrente al modelo ya sea mediante otra sesión o por que los dispositivos puedan ser accionados por otro canal, será necesario refrescar la vista.

# Detalles Backend

El backend tiene implementada la funcionalidad de agregar dispositivos, se puede comprobar con el siguiente comando:

wget --header="Content-Type: application/json" \
--post-data='{"id":"3","state":"1","name":"Persiana", "description":"Garage", "type":"0"}' \
 http://localhost:8000/devices


# Dependencias en instalación

Se ha utilizado como referencia Linux Mint Mate 20, al cual se le instalan los siguientes programas

$ sudo apt-get update

$ sudo apt install git wget

Docker se instala siguiendo las instrucciones tomadas de https://docs.docker.com/engine/install/ubuntu/

$ sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common

$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -    

Hay que reemplazar "$(lsb_release -cs)" por "focal"

$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

$ sudo apt-get update

$ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose


$ sudo usermod -a -G docker $USER

Reiniciar la sesión para tomar el nuevo grupo




# Instalación

Crear una carpeta donde clonar el repositorio, 

$ git clone https://github.com/cpantel/daw-project-template.git

# Ejecución

Entrar en la carpeta daw-project-template y ejecutar docker-compose, la primera vez puede consumir varios minutos.

$ cd daw-project-template

$ docker-compose up

Interrumpir con Control-C una vez haya dejado de emitir mensajes y aparecido el mensaje 

"mysql-server | Version: '5.7.....

Esta repetición sólo es necesario la primera vez.

$ docker-compose up


Conectarse con un navegador a la dirección http://localhost:8000


# Espacio de disco requerido
* distribución: 8 GB
* software:     320MB
* sistema:      2.2G


# Falencias

## Infraestructura

No se eliminó phpamdin del sistema

No se generó una versión de producción para prescindir del compilador de typescript


## Aplicación

No se ajustó al backend para que no falle ante la demora inicial de instalación de mysql.

No se hace ninguna verificación sobre los datos enviados.

Hay mensaje de debug en ambas consolas.



# Licencia

Este proyecto está publicado con la licencia GPL2.0


