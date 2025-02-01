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
const getOrigin = (x, y) => vector2(x / 2, y / 2);
const Subtract = Vector2['Vector2 Subtract(Vector2 value1, Vector2 value2)']
const Normalize = Vector2['Vector2 Normalize(Vector2 value)']

// end

Main.DrawRain.hook((orig, seld) => {
    orig(seld);

    const player = Main.player[0];

    const cursorX = Main.mouseX + Main.screenPosition.X;
    const cursorY = Main.mouseY + Main.screenPosition.Y;
    const cursorPosition = vector2(cursorX, cursorY);

    let direction = Subtract(cursorPosition, player.Center);
    let rotation = Utils.ToRotation(direction) - Math.PI * 2;

    let normalizedDir = Normalize(direction);

    let offsetDistance = 20;
    let offset = vector2(normalizedDir.X * offsetDistance, normalizedDir.Y * offsetDistance);

    let screenPosition = Subtract(player.Center, Main.screenPosition);
    screenPosition = vector2(screenPosition.X + offset.X, screenPosition.Y + offset.Y);

    drawTexture(
        cursor,
        screenPosition,
        Color.White,
        rotation,
        getOrigin(cursor.Width, cursor.Height),
        1
    );
});