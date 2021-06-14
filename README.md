# Space Impact

## PhaserJS game

Attempting to recreate the classic Space Impact game available on retro Nokia phones.

Using PhaserJS. A JavaScript game engine.

## Notes:

```javascript
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
```

- Config used to set renderer, dimensions and default scene.

> Renderer: Use WebGL (default) or Canvas?

- Scene will need to be updated (camera?)