import os
from PIL import Image, ImageDraw, ImageFont

def generate_pwa_icons():
    sizes = [192, 512]
    for size in sizes:
        img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        
        # Rounded rectangle background (#902e2a)
        corner_radius = size // 4
        draw.rounded_rectangle([0, 0, size, size], radius=corner_radius, fill=(144, 46, 42, 255))
        
        # Subtle glowing accent circle in top right (#aeeecb)
        accent_size = size // 8
        accent_x = size - accent_size * 2
        accent_y = accent_size
        draw.ellipse([accent_x, accent_y, accent_x + accent_size, accent_y + accent_size], fill=(174, 238, 203, 230))
        
        # Draw elegant 'S' letter
        # Using basic lines and curves or default font
        try:
            # Try to load a nice serif or sans font
            font = ImageFont.truetype("georgia.ttf", size=int(size * 0.65))
        except Exception:
            try:
                font = ImageFont.truetype("arial.ttf", size=int(size * 0.65))
            except Exception:
                font = ImageFont.load_default()
        
        text = "S"
        bbox = draw.textbbox((0, 0), text, font=font)
        text_w = bbox[2] - bbox[0]
        text_h = bbox[3] - bbox[1]
        x = (size - text_w) // 2
        y = (size - text_h) // 2 - (bbox[1]) - (size // 20)
        
        draw.text((x, y), text, font=font, fill=(255, 255, 255, 255))
        
        out_path = f"public/icon-{size}.png"
        img.save(out_path, format="PNG")
        print(f"Generated {out_path} ({os.path.getsize(out_path)} bytes)")

def optimize_images():
    dirs = ["public/images/advice", "public/images/alerts"]
    total_orig = 0
    total_new = 0
    
    for d in dirs:
        if not os.path.exists(d):
            continue
        for fname in os.listdir(d):
            if fname.lower().endswith(('.jpg', '.jpeg')):
                fpath = os.path.join(d, fname)
                orig_size = os.path.getsize(fpath)
                total_orig += orig_size
                
                # Convert to webp
                base = os.path.splitext(fname)[0]
                webp_path = os.path.join(d, f"{base}.webp")
                
                with Image.open(fpath) as im:
                    # Resize if width > 800px (cards are max 400px wide on screen)
                    if im.width > 800:
                        ratio = 800 / im.width
                        new_h = int(im.height * ratio)
                        im = im.resize((800, new_h), Image.Resampling.LANCZOS)
                    
                    im.save(webp_path, format="WEBP", quality=80, optimize=True)
                    new_size = os.path.getsize(webp_path)
                    total_new += new_size
                    print(f"Compressed {fname} ({orig_size // 1024} KB) -> {base}.webp ({new_size // 1024} KB)")

    print(f"\nOptimization complete! Original: {total_orig // 1024} KB -> New: {total_new // 1024} KB")
    print(f"Saved: {(total_orig - total_new) // 1024} KB ({(1 - total_new/total_orig)*100:.1f}%)")

if __name__ == "__main__":
    generate_pwa_icons()
    optimize_images()
