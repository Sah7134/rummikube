#!/bin/bash
set -eu

echo "Building game-logic..."
cd packages/game-logic
npm run build

echo "Building backend..."
cd ../backend
npm run build

echo "Build complete!"
