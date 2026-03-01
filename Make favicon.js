const { createCanvas, loadImage } = require('canvas')
const fs = require('fs')
const path = require('path')

async function run() {
  const size = 64
  const canvas = createCanvas(size, size)
  const ctx = canvas.getContext('2d')

  // Clip to circle
  ctx.beginPath()
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()

  try {
    const img = await loadImage(path.join(__dirname, 'public', 'logo.png'))
    ctx.drawImage(img, 0, 0, size, size)
    console.log('✅ logo.png mila — circular favicon ban raha hai...')
  } catch {
    // Fallback gradient S
    const g = ctx.createLinearGradient(0, 0, size, size)
    g.addColorStop(0, '#3B5BDB')
    g.addColorStop(1, '#6366F1')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 28px serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('S', size / 2, size / 2)
    console.log('⚠️  logo.png nahi mila — gradient S use kar raha hai')
  }

  const outPath = path.join(__dirname, 'public', 'favicon-round.png')
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'))
  console.log('✅ Done! public/favicon-round.png ban gaya!')
}

run()