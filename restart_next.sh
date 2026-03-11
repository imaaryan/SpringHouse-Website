#!/bin/bash
pkill -f "npm run dev"
pkill -f "next"
sleep 2
npm run dev > .next_output.log 2>&1 &
echo "Restarted Next.js dev server"
