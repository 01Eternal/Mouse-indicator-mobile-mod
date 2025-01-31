import { using } from './ModClasses.js'

using('Terraria')
using('Microsoft.Xna.Framework')
using('Microsoft.Xna.Framework.Graphics')

const vector2 = Vector2.new()['void .ctor(float x, float y)']

let cursor = null

Main.Initialize_AlmostEverything.hook((orig, self) => {
	orig(self);
	
	cursor = tl.texture.load('Textures/Cursor.png')
});


// Eternal Utilities Hehe
function drawTexture(
	texture,
	position,
	color,
	rotation,
	origin,
	scale,
	sprite = null
) {
	Main.spriteBatch[
		"void Draw(Texture2D texture, Vector2 position, Nullable`1 sourceRectangle, Color color, float rotation, Vector2 origin, float scale, SpriteEffects effects, float layerDepth)"
	](texture, position, null, color, rotation, origin, scale, sprite, 0.0);
}
const getOrigin = (x, y) => Vector2.new()['void .ctor(float x, float y)'](x / 2, y / 2);
const Subtract = Vector2['Vector2 Subtract(Vector2 value1, Vector2 value2)']
const Normalize = Vector2['Vector2 Normalize(Vector2 value)']

// end

Main.DrawInterface_FinalUI.hook((orig, self) => {
    orig(self)
});

Main.DrawRain.hook((orig, seld) => {
    
    // Draw after UI.
    orig(seld)
    
    
    const player = Main.player[0]
    
    const cursorX = Main.mouseX + Main.screenPosition.X;
    const cursorY = Main.mouseY + Main.screenPosition.Y;
    const cursorPosition = Vector2.new()['void .ctor(float x, float y)'](cursorX, cursorY)
    
    let rotation = Utils.ToRotation(Subtract(player.Center, cursorPosition)) - Math.PI * 2
    let tangent = Normalize (Subtract(player.Center, cursorPosition))
    let screenPosition = Subtract(tangent, Main.screenPosition)
    
        drawTexture
            (
                cursor, //
                screenPosition,
                Color.White,
                rotation,
                getOrigin(cursor.Width, cursor.Height),
                1
            )
});
    
    