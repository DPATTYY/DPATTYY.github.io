# Avatar Model Setup

## Getting Your Ready Player Me Avatar

1. Visit [Ready Player Me](https://readyplayer.me/)
2. Create your custom avatar using their builder
3. Download your avatar as a **GLB file**
4. Rename it to `avatar.glb`
5. Place it in this directory (`public/models/avatar.glb`)

## Alternative: Use a Placeholder

If you don't have an avatar yet, you can use any 3D model in GLB format:
- Free models from [Sketchfab](https://sketchfab.com/)
- Use [glTF Sample Models](https://github.com/KhronosGroup/glTF-Sample-Models)
- Any rigged character model in `.glb` format

## Model Requirements

- **Format**: `.glb` (binary glTF)
- **Recommended Size**: Under 10MB for optimal loading
- **Orientation**: Model should face forward (positive Z-axis)
- **Scale**: The component auto-scales, but models around 1-2 units tall work best

## Testing

Once you add `avatar.glb` to this folder, the FloatingAvatarHero component will automatically load it.

## Troubleshooting

If the model doesn't appear:
1. Check browser console for errors
2. Verify the file is named exactly `avatar.glb`
3. Ensure the file is in `public/models/` directory
4. Try clearing browser cache and refreshing
