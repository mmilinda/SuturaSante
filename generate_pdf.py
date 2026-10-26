import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        footer_text = "SuturaSanté • UNICEF / Suède Innovation Fund (Femtech 2026) • Sénégal"
        self.drawString(1.5 * cm, 1 * cm, footer_text)
        page_num_str = f"Page {self._pageNumber} sur {page_count}"
        self.drawRightString(A4[0] - 1.5 * cm, 1 * cm, page_num_str)
        self.restoreState()

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=1.5 * cm,
        rightMargin=1.5 * cm,
        topMargin=1.8 * cm,
        bottomMargin=1.8 * cm
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    brand_rose = colors.HexColor("#be123c")
    dark_slate = colors.HexColor("#0f172a")
    text_color = colors.HexColor("#334155")
    bg_light = colors.HexColor("#f8fafc")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=dark_slate,
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#475569"),
        spaceAfter=15
    )

    h1_style = ParagraphStyle(
        'Heading1Custom',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=brand_rose,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2Custom',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=dark_slate,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=text_color,
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=body_style,
        leftIndent=14,
        firstLineIndent=-10,
        spaceAfter=4
    )

    callout_style = ParagraphStyle(
        'CalloutText',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#881337")
    )

    story = []

    # Tag header UNICEF
    header_table = Table(
        [[
            Paragraph("<b>UNICEF / SUÈDE INNOVATION FUND — FEMTECH COHORT</b>", ParagraphStyle('U', fontName='Helvetica-Bold', fontSize=8.5, textColor=colors.HexColor("#1d4ed8"))),
            Paragraph("<b>SÉNÉGAL 🇸🇳</b>", ParagraphStyle('S', fontName='Helvetica-Bold', fontSize=8.5, alignment=2, textColor=colors.HexColor("#047857")))
        ]],
        colWidths=[13*cm, 5*cm]
    )
    header_table.setStyle(TableStyle([
        ('LINEBELOW', (0,0), (-1,-1), 1.5, brand_rose),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 12))

    # Titre du projet
    story.append(Paragraph("Sutura<font color='#be123c'>Santé</font>", title_style))
    story.append(Paragraph("Cahier des Charges Fonctionnel & Technique d'Innovation Maternelle", subtitle_style))

    # Tableau méta
    meta_data = [
        [
            Paragraph("<b>Projet :</b> SuturaSanté", body_style),
            Paragraph("<b>Échéance :</b> 04 Novembre 2026", body_style)
        ],
        [
            Paragraph("<b>Zone :</b> Sénégal (Dakar, Thiès, Kaolack)", body_style),
            Paragraph("<b>Financement visé :</b> Jusqu'à 100 000 $ US", body_style)
        ],
        [
            Paragraph("<b>Licence :</b> Open Source (MIT) / Digital Public Good", body_style),
            Paragraph("<b>Canal :</b> PWA Mobile (<2 Mo) + Pont WhatsApp + Audio Wolof", body_style)
        ]
    ]
    meta_table = Table(meta_data, colWidths=[9*cm, 9*cm])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), bg_light),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 10))

    # 1. Contexte & Problématique
    story.append(Paragraph("1. Contexte Local & Justification au Sénégal", h1_style))
    story.append(Paragraph(
        "Au Sénégal, la mortalité maternelle et néonatale demeure un défi majeur. Moins de 50% des femmes enceintes effectuent les 4 Consultations Prénatales (CPN) requises. Ce déficit est accentué par la <b>barrière de la langue</b> (le wolof parlé est la langue du quotidien pour plus de 80% des usagères), la <b>pudeur sociale ('Sutura')</b> autour des questions intimes et des tabous liés à la santé de la femme, ainsi que des <b>contraintes techniques fortes</b> (smartphones d'entrée de gamme saturés, priorité absolue aux pass WhatsApp data limités).",
        body_style
    ))

    # 2. Proposition de Valeur
    story.append(Paragraph("2. Solution Proposée : PWA Vocale & Pont WhatsApp", h1_style))
    callout_data = [[Paragraph(
        "<b>Innovation Inclusive :</b> SuturaSanté propose une Progressive Web App ultra-légère (< 2 Mo) utilisable sans installation sur les stores applicatifs, bilingue Français & Wolof avec lecture audio native, couplée à un algorithme de triage d'urgence et un tableau de bord public d'impact conforme UNICEF.",
        callout_style
    )]]
    callout_table = Table(callout_data, colWidths=[18*cm])
    callout_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#fff1f2")),
        ('LINELEFT', (0,0), (0,0), 3, brand_rose),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#fecdd3")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(callout_table)
    story.append(Spacer(1, 8))

    # 3. Spécifications Fonctionnelles
    story.append(Paragraph("3. Spécifications des Modules Fonctionnels", h1_style))
    
    story.append(Paragraph("A. Calculateur CPN & Suivi de Grossesse", h2_style))
    story.append(Paragraph("• Calcul dynamique du terme en semaines d'aménorrhée (SA) et de la date prévisionnelle d'accouchement.", bullet_style))
    story.append(Paragraph("• Génération automatique des 4 jalons CPN (CPN 1: <12 SA, CPN 2: 20-24 SA, CPN 3: 28 SA, CPN 4: 32-36 SA) selon le protocole officiel du Ministère de la Santé du Sénégal.", bullet_style))
    story.append(Paragraph("• Conseils personnalisés avec bouton d'écoute audio instantané en Wolof.", bullet_style))

    story.append(Paragraph("B. Triage Rapide des Signes de Danger Obstétrique", h2_style))
    story.append(Paragraph("• Détection immédiate des alertes critiques : saignements vaginaux, céphalées aiguës/vision trouble (pré-éclampsie), diminution des mouvements fœtaux, forte fièvre.", bullet_style))
    story.append(Paragraph("• <b>Classification tripolaire :</b> Vert (rassurant), Orange (vigilance sous 24h), Rouge (urgence vitale avec bouton d'appel direct vers le <b>SAMU National 1515</b>).", bullet_style))

    story.append(Paragraph("C. Guide de Santé Reproductive & Nutrition Locale", h2_style))
    story.append(Paragraph("• Fiches interactives audio sur la nutrition riche en fer adaptée au Sénégal (feuilles de Moringa/Neverdie, niébé, poisson frais).", bullet_style))
    story.append(Paragraph("• Prévention du paludisme (TPI), hygiène menstruelle et soutien psychologique post-partum (Nafsa).", bullet_style))

    story.append(Paragraph("D. Répertoire National d'Urgence", h2_style))
    contact_data = [
        [Paragraph("<b>Structure / Ligne</b>", h2_style), Paragraph("<b>Numéro</b>", h2_style), Paragraph("<b>Mission</b>", h2_style)],
        [Paragraph("SAMU National Sénégal", body_style), Paragraph("<b>1515</b> (Gratuit)", body_style), Paragraph("Urgences médicales & ambulances 24/7", body_style)],
        [Paragraph("Sapeurs-Pompiers", body_style), Paragraph("<b>18</b> (Gratuit)", body_style), Paragraph("Secours d'urgence et évacuation", body_style)],
        [Paragraph("Ligne Écoute VBG & Enfance", body_style), Paragraph("<b>116</b> (Gratuit)", body_style), Paragraph("Assistance confidentielle femmes et mineurs", body_style)],
        [Paragraph("Maternités de Référence", body_style), Paragraph("Dakar, Thiès, Kaolack", body_style), Paragraph("Hôpital Principal, Dalal Jamm, Roi Baudouin", body_style)]
    ]
    ct_table = Table(contact_data, colWidths=[5.5*cm, 3.5*cm, 9*cm])
    ct_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#f1f5f9")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(ct_table)
    story.append(Spacer(1, 8))

    # 4. Exigence UNICEF : Données Publiques
    story.append(Paragraph("4. Transparence & Données Publiques (Critère UNICEF Innovation Fund)", h1_style))
    story.append(Paragraph(
        "SuturaSanté respecte l'obligation d'exposer publiquement des données mesurables via la route <code>/metrics</code>. Les indicateurs suivis en temps réel sont :",
        body_style
    ))
    story.append(Paragraph("• Volume d'utilisatrices et de relais communautaires accompagnés.", bullet_style))
    story.append(Paragraph("• Taux d'écoute des consignes audio en Wolof (mesure d'inclusion des populations orales).", bullet_style))
    story.append(Paragraph("• Nombre de triages d'alerte et d'urgences rouges orientées vers le SAMU / maternités.", bullet_style))
    story.append(Paragraph("• <b>Confidentialité stricte (Sutura) :</b> 100% anonymisé, aucune donnée nominative ou numéro privé n'est collecté.", bullet_style))

    # 5. Architecture Technique
    story.append(Paragraph("5. Architecture Technique & Open Source", h1_style))
    tech_data = [
        [Paragraph("<b>Composant</b>", h2_style), Paragraph("<b>Technologie</b>", h2_style), Paragraph("<b>Impact</b>", h2_style)],
        [Paragraph("Frontend", body_style), Paragraph("React 18 / Vite / Tailwind CSS", body_style), Paragraph("Poids ultra-léger (<200 Ko script), ultra fluide sur 3G", body_style)],
        [Paragraph("Audio Engine", body_style), Paragraph("Web Speech API + Clips Wolof", body_style), Paragraph("Accessible sans téléchargement d'application", body_style)],
        [Paragraph("Hébergement", body_style), Paragraph("Vercel Edge Network", body_style), Paragraph("SSL gratuit, haute disponibilité en Afrique de l'Ouest", body_style)],
        [Paragraph("Licence", body_style), Paragraph("MIT License (GitHub Public)", body_style), Paragraph("100% conforme Digital Public Good d'UNICEF", body_style)]
    ]
    t_table = Table(tech_data, colWidths=[4*cm, 5.5*cm, 8.5*cm])
    t_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#f1f5f9")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_table)
    story.append(Spacer(1, 8))

    # 6. Feuille de route
    story.append(Paragraph("6. Calendrier Opérationnel jusqu'au 04 Novembre 2026", h1_style))
    cal_data = [
        [Paragraph("<b>Dates</b>", h2_style), Paragraph("<b>Objectifs</b>", h2_style), Paragraph("<b>Livrable UNICEF</b>", h2_style)],
        [Paragraph("26 - 28 Octobre", body_style), Paragraph("Déploiement en ligne & tests internes", body_style), Paragraph("Lien Vercel actif + Code GitHub public", body_style)],
        [Paragraph("29 - 31 Octobre", body_style), Paragraph("Micro-pilote terrain (Dakar / Thiès)", body_style), Paragraph("Test auprès de 30-50 femmes & relais", body_style)],
        [Paragraph("01 - 02 Novembre", body_style), Paragraph("Consolidation des données publiques", body_style), Paragraph("Métriques réelles sur /metrics", body_style)],
        [Paragraph("03 - 04 Novembre", body_style), Paragraph("Finalisation & Dépôt candidature", body_style), Paragraph("Soumission formelle UNICEF", body_style)]
    ]
    c_table = Table(cal_data, colWidths=[4*cm, 6.5*cm, 7.5*cm])
    c_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#f1f5f9")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(c_table)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF généré avec succès : {filename}")

if __name__ == "__main__":
    dest1 = r"C:\Users\MILINDA MENDY\Desktop\Cahier_des_Charges_SuturaSante_UNICEF.pdf"
    dest2 = r"C:\Users\MILINDA MENDY\.gemini\antigravity\scratch\sutura-sante\Cahier_des_Charges_SuturaSante_UNICEF.pdf"
    build_pdf(dest1)
    build_pdf(dest2)
