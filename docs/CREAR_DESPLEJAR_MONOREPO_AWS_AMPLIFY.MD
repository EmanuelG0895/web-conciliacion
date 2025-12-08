Para desplegar un proyecto monorepo en AWS Amplify siga los siguientes pasos

1. Seleccione la opción donde este guardado el repositorio (en este caso github) click en siguiente

2. Conceda permisos de la cuenta, se recomienda solo dar acceso a unicamente el repositorio en el cual esta almacenado el proyecto monorepo, en caso de que la ventana no se cierre sola después de dar los permisos puede dar click en siguiente o simplemente cerrar la ventana emergente.

3. Una vez otorgados los permisos damos click en la opción "Seleccionar un repositorio" el cual despejara una lista de los repositorios, seleccionamos el repositorio que contiene nuestro proyecto monorepo que queremos despejar, en automático se seleccionara la rama main, en caso de no sea esa la rama donde se encuentre el proyecto listo para el despliegue haciendo click se despejara una lista con las ramas.

4. Debemos aclarar a amplify que el muestro proyecto es un monorepo, para ello marcamos la opción "Mi aplicación es un Monorepo".

5. Se debe asignar la ruta a la cual debe acceder el monorepo por ejemplo "apps/web" es importante que el inicio de la ruta se entregue sin "/" ya que eso generaría conflicto con el enrutamiento y provocaría un error en el desligue esto con la finalidad de que amplify detecte cual sera el home de la aplicación, damos click en el botón siguiente.

6. Verifica el nombre del proyecto, lo ideal es que lo edites con un nombre claro por ejemplo "Home" o "Main" separado por guiones seguido del nombre del proyecto esto con la finalidad de que sea fácilmente identificable cual es el centro de la aplicación.

7. Verifica el "Comando de compilación de frontend" el cual debe verse como en el siguiente ejemplo "cd ../../ && pnpm turbo run build --filter=web", este comando de compilación viene predefinido en el archivo amplify.yml ubicado en la raíz del proyecto, pero debes validar que realmente este dirigiendo al cito adecuado, el cual esta después del signo igual, en este caso la palabra "web".

8. Verifica la variable "Compilar el directorio de salida" en ella siempre debe aparecer .next, este dato lo toma del archivo amplify.yml pero siempre es necesario observar que tenga el contenido correcto, damos click en el botón siguiente. 

9. Asegúrate que la configuración sea correcta y da click en guardar y despejar.

10. El despliegue tardara algunos minutos en completarse, en caso de tener algún error puedes acceder al proyecto, puedes acceder a los detalles desde la sección de ramificaciones, haciendo click en el card, esto te llevara a una nueva pantalla, en caso de tener algún error en el despliegue puedes hacer click en el botón descargar para bajar un archivo txt con todos los logs y asi ubicar el error.



