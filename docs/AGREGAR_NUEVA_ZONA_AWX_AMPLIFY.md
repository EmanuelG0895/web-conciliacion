Para agregar una nueva zona ( microfrontend ) sigue los siguientes pasos

1. Seleccione la opción donde este guardado el repositorio (en este caso github) click en siguiente

2. Conceda permisos de la cuenta, se recomienda solo dar acceso a unicamente el repositorio en el cual esta almacenado el proyecto monorepo, en caso de que la ventana no se cierre sola después de dar los permisos puede dar click en siguiente o simplemente cerrar la ventana emergente.

3. Una vez otorgados los permisos damos click en la opción "Seleccionar un repositorio" el cual despejara una lista de los repositorios, seleccionamos el repositorio que contiene nuestro proyecto monorepo que queremos despejar, en automático se seleccionara la rama main, en caso de no sea esa la rama donde se encuentre el proyecto listo para el despliegue haciendo click se despejara una lista con las ramas, click en siguiente.

4. Verifica el nombre del proyecto, lo ideal es que lo edites con un nombre claro por ejemplo "Home" o "Main" separado por guiones seguido del nombre del proyecto esto con la finalidad de que sea fácilmente identificable cual es el centro de la aplicación.

5. Verifica el "Comando de compilación de frontend" el cual debe verse como en el siguiente ejemplo "cd ../../ && pnpm turbo run build --filter=web", este comando de compilación viene predefinido en el archivo amplify.yml ubicado en la raíz del proyecto, pero debes validar que realmente este dirigiendo al cito adecuado, el cual esta después del signo igual, en este caso la palabra "web", en caso de que no sea puedes modificarlo por el nombre correcto de la ruta que va a tener por ejemplo "docs" dando como resultado final algo como cd ../../ && pnpm turbo run build --filter=docs.

9. Despliega el meno "Configuración avanzada" en la parte final de ese archivo marca la opción "Habilitar los registros de la aplicación SSR" al ser una aplicación next.js necesitaremos el renderizado en servidor, realizadas estas configuraciones da click en siguiente.

10.  Asegúrate que la configuración sea correcta y da click en guardar y despejar.

11. El despliegue tardara algunos minutos en completarse, en caso de tener algún error puedes acceder al proyecto, puedes acceder a los detalles desde la sección de ramificaciones, haciendo click en el card, esto te llevara a una nueva pantalla, en caso de tener algún error en el despliegue puedes hacer click en el botón descargar para bajar un archivo txt con todos los logs y asi ubicar el error.

12. Una vez concretado el desligue de manera correcta deberás obtener el domino de la nueva zona el cual se desplegó, este dominio nos sera de utilidad ya que debemos utilizarlo como variable de entorno en nuestro mono repo.

13. Accedemos a nuestro mono repo (main), seleccionamos la opción Hospedaje que se encuentra en elk menu lateral de la izquierda, ahi encontraremos la opción "Variables de entorno".

14. Damos click en "Administrar variables"

15. Damos click en "agregar nuevo", el nombre de la variable debe ser la misma que se encentra instancia en la configuración de next por ejemplo DOMAIN_DOCS y en la sección de valor debe tener la url que genero amplify al despej ar el cito 