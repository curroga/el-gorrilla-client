# Workflow - Flujo de trabajo profesional para issues de GitHub

## Descripción
Este skill gestiona el flujo de trabajo completo para resolver issues, features o bugs de GitHub de manera profesional usando git worktrees.

## Argumentos
- `$ARGUMENTS` - Puede ser un número de issue (#123), URL de GitHub, o descripción del trabajo a realizar

## Instrucciones

### Paso 1: Identificar el tipo de trabajo

Analiza `$ARGUMENTS` para determinar:
1. **Si es una issue de GitHub** (contiene # seguido de número, o es URL de GitHub):
   - Usa `gh issue view <número>` para obtener detalles
   - Extrae: título, tipo (bug/feature/enhancement), descripción

2. **Si es una descripción manual**:
   - Pregunta al usuario el tipo: `feature`, `fix`, `refactor`, `docs`, `chore`

### Paso 2: Determinar el proyecto

Pregunta al usuario en qué proyecto trabajar:
- `client` - el-gorrilla-client (frontend React)
- `server` - el-gorrilla-server (backend Node.js)
- `both` - ambos (crear worktree para cada uno)

### Paso 3: Crear el worktree y rama

**Formato de rama**: `{tipo}/issue-{número}-{descripcion-corta}`
- Ejemplos: `feature/issue-42-add-dark-mode`, `fix/issue-15-null-pointer`
- Si no hay issue, omitir el número: `feature/add-dark-mode`

**Ubicación de worktrees**: `../worktrees/`

Ejecuta los siguientes comandos:

```bash
# Crear directorio de worktrees si no existe
mkdir -p ../worktrees

# Determinar la ruta base del proyecto
# Para client: ../worktrees/client-{rama}
# Para server: ../worktrees/server-{rama}

# Fetch del remoto
git fetch origin

# Crear worktree desde master
git worktree add -b {nombre-rama} ../worktrees/{proyecto}-{nombre-rama} origin/master
```

### Paso 4: Cambiar al worktree

Informa al usuario que debe cambiar al nuevo worktree:
```
cd ../worktrees/{proyecto}-{nombre-rama}
```

**IMPORTANTE**: Pregunta al usuario si quiere que continues trabajando en el worktree recién creado o si prefiere hacerlo manualmente.

### Paso 5: Trabajar en la issue

Si el usuario quiere continuar:
1. Lee y comprende la issue completamente
2. Explora el código relevante
3. Implementa los cambios necesarios
4. Haz commits atómicos con mensajes descriptivos siguiendo Conventional Commits:
   - `feat:` para nuevas funcionalidades
   - `fix:` para corrección de bugs
   - `refactor:` para refactorizaciones
   - `docs:` para documentación
   - `chore:` para tareas de mantenimiento

### Paso 6: Crear Pull Request

Cuando el trabajo esté completo:

1. **Push de la rama**:
```bash
git push -u origin {nombre-rama}
```

2. **Crear PR con gh**:
```bash
gh pr create --title "{tipo}: {descripción corta}" --body "$(cat <<'EOF'
## Resumen
{Descripción breve de los cambios}

## Issue relacionada
Closes #{número-issue}

## Cambios realizados
- {Lista de cambios}

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva feature
- [ ] Breaking change
- [ ] Requiere actualización de documentación

## Testing
- [ ] Tests unitarios añadidos/actualizados
- [ ] Tests manuales realizados

## Screenshots (si aplica)
{Capturas de pantalla si hay cambios de UI}
EOF
)"
```

### Paso 7: Limpieza (opcional)

Pregunta al usuario si quiere limpiar el worktree después del merge:
```bash
# Volver al proyecto principal
cd /home/fjgalba/Proyectos/elGorrilla/el-gorrilla-client

# Eliminar worktree
git worktree remove ../worktrees/{proyecto}-{nombre-rama}

# Eliminar rama local (después del merge)
git branch -d {nombre-rama}
```

## Comandos útiles para el usuario

```bash
# Listar worktrees activos
git worktree list

# Ver estado de PRs
gh pr list

# Ver issues abiertas
gh issue list
```

## Notas importantes

- Siempre hacer fetch antes de crear una rama nueva
- Los worktrees permiten trabajar en múltiples issues simultáneamente
- Cada worktree es una copia de trabajo independiente
- No mezclar cambios de diferentes issues en la misma rama
