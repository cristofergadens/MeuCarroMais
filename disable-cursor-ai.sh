#!/bin/bash

# Desabilitar Cursor AI completamente
echo "Desabilitando Cursor AI..."

# Fechar todas as instâncias do Cursor
pkill -f "Cursor"

# Aguardar um momento
sleep 2

# Abrir Cursor com IA desabilitada
open -a "Cursor" --args --disable-extensions --disable-ai

echo "Cursor AI desabilitado. Reabra o Cursor manualmente se necessário." 