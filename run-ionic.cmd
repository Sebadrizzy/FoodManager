@echo off
REM Activa polling para evitar errores lstat (pagefile.sys) en Windows
set CHOKIDAR_USEPOLLING=true
REM Pasa cualquier argumento recibido a ionic serve
ionic serve %*
