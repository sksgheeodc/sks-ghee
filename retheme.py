import re
import os

filepath = r'c:\Users\ABIMANYU M\Desktop\ghee\sks-ghee-main\style.css'
with open(filepath, 'r', encoding='utf-8') as f:
    css = f.read()

# Replace CSS Variables
css = re.sub(r'--gold:\s*#.*?;', '--gold: #E03C31;', css)
css = re.sub(r'--gold-light:\s*#.*?;', '--gold-light: #F25C54;', css)
css = re.sub(r'--gold-pale:\s*#.*?;', '--gold-pale: #FCE8E6;', css)

css = re.sub(r'--brown:\s*#.*?;', '--brown: #6B3074;', css)
css = re.sub(r'--text-dark:\s*#.*?;', '--text-dark: #2D1A30;', css)
css = re.sub(r'--text-mid:\s*#.*?;', '--text-mid: #523A57;', css)
css = re.sub(r'--text-light:\s*#.*?;', '--text-light: #8A728F;', css)
css = re.sub(r'--border:\s*#.*?;', '--border: #E8D8E5;', css)
css = re.sub(r'--cream:\s*#.*?;', '--cream: #FAF7FB;', css)
css = re.sub(r'--cream-dark:\s*#.*?;', '--cream-dark: #F0E6F2;', css)

# Replace hardcoded colors (case insensitive)
def r(pattern, repl):
    global css
    css = re.sub(pattern, repl, css, flags=re.IGNORECASE)

# Dark browns -> Dark purples
r(r'#3B1F0C', '#4A1D54')
r(r'#2A1608', '#381440')
r(r'#3b2818', '#523A57')
r(r'#2C1A0E', '#2D1A30')
r(r'#8B5E34', '#6B3074')
r(r'#e8d9b0', '#E8D8E5')

# Golds -> Red/Orange
r(r'#E8A020', '#E03C31')

# Rgb/Rgba colors
r(r'rgba\(\s*200\s*,\s*134\s*,\s*10\s*,', 'rgba(224, 60, 49,')
r(r'rgba\(\s*232\s*,\s*160\s*,\s*32\s*,', 'rgba(224, 60, 49,')
r(r'rgba\(\s*44\s*,\s*26\s*,\s*14\s*,', 'rgba(45, 26, 48,')
r(r'rgba\(\s*59\s*,\s*31\s*,\s*12\s*,', 'rgba(74, 29, 84,')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(css)

print("CSS colors successfully updated!")
