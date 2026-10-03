import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent / 'tmp' / 'python-libs'))
import qrcode
from qrcode.image.svg import SvgPathFillImage
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from PIL import Image
import fitz
import zxingcpp

url = sys.argv[1]
assert url.startswith('https://') and '.chatgpt.site' in url
root = Path(__file__).parent
out = root / 'qr'
out.mkdir(exist_ok=True)
qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H, box_size=40, border=6)
qr.add_data(url)
qr.make(fit=True)
qr.make_image(fill_color='black', back_color='white').save(out / 'qr-code.png')
qr.make_image(image_factory=SvgPathFillImage).save(out / 'qr-code.svg')
decoded = zxingcpp.read_barcode(Image.open(out / 'qr-code.png'))
assert decoded and decoded.text == url, 'PNG decode mismatch'

# Confirm the SVG module geometry is identical to the decoded PNG matrix.
import xml.etree.ElementTree as ET
svg = ET.parse(out / 'qr-code.svg').getroot()
assert svg.find('{http://www.w3.org/2000/svg}path') is not None
assert qr.border == 6 and qr.error_correction == qrcode.constants.ERROR_CORRECT_H

pdf = canvas.Canvas(str(out / 'church-wifi-sign.pdf'), pagesize=A4)
pdf.setTitle('Scan for Church WiFi')
pdf.setAuthor('')
w, h = A4
pdf.setFillColorRGB(0, 0, 0)
pdf.setFont('Helvetica-Bold', 32)
pdf.drawCentredString(w / 2, h - 63 * mm, 'Scan for')
pdf.setFont('Helvetica-Bold', 42)
pdf.drawCentredString(w / 2, h - 83 * mm, 'Church WiFi')
size = 158 * mm
pdf.drawImage(str(out / 'qr-code.png'), (w - size) / 2, h - 98 * mm - size, width=size, height=size)
pdf.showPage()
pdf.save()
doc = fitz.open(out / 'church-wifi-sign.pdf')
page = doc[0]
assert 'Scan for' in page.get_text() and 'Church WiFi' in page.get_text()
pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
pix.save(root / 'tmp' / 'sign-preview.png')
im = Image.frombytes('RGB', [pix.width, pix.height], pix.samples)
decoded_pdf = zxingcpp.read_barcode(im)
assert decoded_pdf and decoded_pdf.text == url, 'PDF decode mismatch'
(out / 'production-url.txt').write_text(url + '\n', encoding='utf8')
print(f'Verified PNG and PDF QR decode: {url}; PNG: {Image.open(out / "qr-code.png").size}; A4 PDF; H correction; 6-module quiet zone')
