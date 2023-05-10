# Demo3: Physics Game
**Where to play your game (a link to your deployed game)**
My deployed game can be found here: https://mikaps.github.io/Demo3/

**How your design satisfies the experience requirements below**
- The game uses both continuous and discrete inputs from the player
        Continuous: clicking on the mouse makes the player move faster, movement using the 'up' and 'down' keys.
        Discrete: pressing the number '1' decreases water damage, need to click the wood pieces in levels 2-3.

- The player’s goal can only be achieved indirectly (by allowing the physics engine to move key objects into position/contact).
        The boat is affected by gravity and moves with acceleration.
        There is collision with the finish line to move to the next level.
        Collision with rocks will lose the game.

- 3+ physics-based gameplay scenes (possibly implemented with a single Phaser Scene subclass).
Other scenes are used to separate and contextualize the gameplay scenes
    3 gameplay scenes are in the First Phaser Scene. In each level, the game becomes more complicated and introduces new ideas.
    There are other scenes in between gameplay: Title scene with the name of the game, Instructions scene, Winning scene, and Losing scene.


**How all of your data assets (if you have any) were created**
I drew all of my assets using the mobile app ibisPaint X and edited the website remove.bg.
