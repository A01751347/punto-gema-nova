# Cómo instalar esta skill

## Opción A — para todos tus proyectos (recomendada)

```bash
mkdir -p ~/.claude/skills
cp -r .claude/skills/cotizacion-propuesta ~/.claude/skills/
```

Queda disponible en cualquier sesión de Claude Code, en cualquier repo. Se activa sola
cuando pides una cotización, o a mano con `/cotizacion-propuesta`.

## Opción B — solo en este repo

Ya está: vive en `.claude/skills/cotizacion-propuesta/` y viaja con el repositorio.
Cualquiera que clone el proyecto la tiene.

## Opción C — sin skill

Abre `PROMPT.md`, copia el bloque y pégalo con tu material en cualquier sesión
(claude.ai, otro repo, otra herramienta).

## Cómo se usa

> Cotiza este proyecto para <cliente>. Te paso mis notas y los precios de cada fase.

Y pegas tu material. Si falta algo (folio, contacto, plazos), lo pregunta todo junto
antes de empezar.

## Cómo se mantiene

Cuando una cotización nueva descubra un patrón que valga la pena — un diagrama que
funcionó, una frase que cerró la venta, un error de maquetación que se repitió — se
agrega a `reference/`. La skill mejora con cada propuesta; no se reescribe.
