"use client";

import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { Course } from "@/lib/course-data-au";
import { namedTeachers } from "@/lib/teachers-data";

/* ─── Brand ─────────────────────────────────────────── */
const C = {
  orange:   "#f97316",
  orangeDk: "#ea580c",
  cream:    "#FFF9F3",
  creamBdr: "#FCE8D6",
  ink:      "#111827",
  gray:     "#6B7280",
  lgray:    "#E5E7EB",
  fgray:    "#F3F4F6",
  white:    "#FFFFFF",
  green:    "#16A34A",
  blue:     "#3B82F6",
  purple:   "#8B5CF6",
  amber:    "#D97706",
  teal:     "#0D9488",
};

const CAT: Record<string, { bg: string; fg: string }> = {
  "EXAM STRATEGY": { bg: "#FFF7ED", fg: C.orange },
  "LANGUAGE":      { bg: "#EFF6FF", fg: C.blue },
  "SPELLING":      { bg: "#F5F3FF", fg: C.purple },
  "NUMERACY":      { bg: "#FFFBEB", fg: C.amber },
  "READING":       { bg: "#F0FDFA", fg: C.teal },
  "WRITING":       { bg: "#F0FDF4", fg: C.green },
  "EXAM PRACTICE": { bg: "#F9FAFB", fg: C.gray },
};

const LOGO = "/Final-Logo-bg-removed.png";
const WEB  = "supersheldon.com";
const WA   = "+91 7974695618";
const DEMO = "supersheldon.com/demo";

const DEFAULT_BENEFITS = [
  "Learn key concepts from the ground up",
  "Master problem-solving techniques for higher scores",
  "Approach complex questions with confidence",
  "Save time with smart strategies and shortcuts",
  "Practice with real-world curriculum questions",
  "Track progress with regular assessments",
];

/* ─── Styles ─────────────────────────────────────────── */
const S = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: C.ink,
    backgroundColor: C.white,
    paddingBottom: 48,
  },

  footer: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    height: 36,
    paddingHorizontal: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: C.lgray,
  },
  footerText: { fontSize: 7.5, color: C.gray },

  topStripe: { height: 4, backgroundColor: C.orange },

  /* Cover */
  hero: {
    backgroundColor: C.orange,
    paddingHorizontal: 40,
    paddingTop: 32,
    paddingBottom: 28,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 26,
  },
  logo: { height: 30, objectFit: "contain" },
  heroBrochureLabel: {
    color: C.white, fontSize: 8, fontFamily: "Helvetica-Bold",
    letterSpacing: 2, opacity: 0.85,
  },
  heroEyebrow: {
    color: C.white, fontSize: 8, fontFamily: "Helvetica-Bold",
    letterSpacing: 2, opacity: 0.85, marginBottom: 8,
  },
  heroTitle: {
    color: C.white, fontSize: 32, fontFamily: "Helvetica-Bold",
    lineHeight: 1.1, marginBottom: 12,
  },
  badgeRow: { flexDirection: "row" },
  badge: {
    backgroundColor: "rgba(255,255,255,0.2)", color: C.white,
    fontSize: 7.5, fontFamily: "Helvetica-Bold", letterSpacing: 1,
    paddingVertical: 3, paddingHorizontal: 10,
    borderRadius: 20, marginRight: 6,
  },

  /* Stats strip on cover */
  statsStrip: {
    flexDirection: "row",
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: C.lgray,
  },
  statCell: {
    flex: 1, alignItems: "center", paddingVertical: 4,
    borderRightWidth: 1, borderRightColor: C.lgray,
  },
  statCellLast: { flex: 1, alignItems: "center", paddingVertical: 4 },
  statValue: {
    fontSize: 15, fontFamily: "Helvetica-Bold", color: C.orange, marginBottom: 2,
  },
  statLabel: { fontSize: 7.5, color: C.gray, letterSpacing: 0.5 },

  body: { paddingHorizontal: 40, paddingTop: 22 },
  sectionTitle: {
    fontSize: 13, fontFamily: "Helvetica-Bold", color: C.ink, marginBottom: 4,
  },
  sectionAccent: {
    width: 30, height: 3, backgroundColor: C.orange,
    borderRadius: 2, marginBottom: 12,
  },
  paragraph: { fontSize: 10.5, lineHeight: 1.6, color: "#374151" },

  instructorBox: {
    marginTop: 20, flexDirection: "row", alignItems: "center",
    backgroundColor: C.cream, borderRadius: 10,
    borderWidth: 1, borderColor: C.creamBdr, padding: 14,
  },
  instructorAvatar: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: C.orange, alignItems: "center",
    justifyContent: "center", marginRight: 12,
  },
  instructorInitial: { color: C.white, fontSize: 15, fontFamily: "Helvetica-Bold" },
  metaLabel: {
    fontSize: 7, color: C.gray, fontFamily: "Helvetica-Bold",
    letterSpacing: 1, marginBottom: 2,
  },
  metaValue: { fontSize: 10.5, fontFamily: "Helvetica-Bold", color: C.ink },

  /* Curriculum 2-col */
  curriculumCols: { flexDirection: "row", paddingHorizontal: 40 },
  colLeft:  { flex: 1, marginRight: 7 },
  colRight: { flex: 1, marginLeft: 7 },

  moduleCard: {
    marginBottom: 9, borderWidth: 1, borderColor: C.lgray,
    borderRadius: 8, padding: 10, backgroundColor: C.white,
  },
  moduleTopRow: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  moduleNum: {
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: C.orange, alignItems: "center",
    justifyContent: "center", marginRight: 7,
  },
  moduleNumText: { color: C.white, fontSize: 8, fontFamily: "Helvetica-Bold" },
  catTag: { borderRadius: 10, paddingVertical: 2, paddingHorizontal: 6 },
  catTagText: { fontSize: 6, fontFamily: "Helvetica-Bold", letterSpacing: 0.3 },
  moduleTitle: {
    fontSize: 9.5, fontFamily: "Helvetica-Bold", color: C.ink,
    marginBottom: 3, lineHeight: 1.3,
  },
  moduleDesc: { fontSize: 8.5, lineHeight: 1.4, color: C.gray, marginBottom: 5 },
  relevancyBox: {
    borderLeftWidth: 2, borderLeftColor: C.orange,
    paddingLeft: 6, paddingVertical: 3,
    backgroundColor: "#FFF7ED", borderRadius: 2,
  },
  relevancyLabel: {
    fontSize: 6, fontFamily: "Helvetica-Bold",
    color: C.orange, letterSpacing: 0.5, marginBottom: 1,
  },
  relevancyText: { fontSize: 7.5, lineHeight: 1.3, color: C.orangeDk },

  /* Pricing page */
  pricingRow: { flexDirection: "row", marginHorizontal: -5 },
  priceCard: {
    flex: 1, marginHorizontal: 5, borderWidth: 1,
    borderColor: C.lgray, borderRadius: 10, padding: 12,
  },
  priceCardRec: {
    flex: 1, marginHorizontal: 5, borderWidth: 2,
    borderColor: C.orange, borderRadius: 10, padding: 12,
    backgroundColor: C.cream,
  },
  priceBadge: {
    alignSelf: "flex-start", fontSize: 6.5, fontFamily: "Helvetica-Bold",
    color: C.orangeDk, backgroundColor: C.creamBdr,
    paddingVertical: 2, paddingHorizontal: 6,
    borderRadius: 10, marginBottom: 6, letterSpacing: 0.5,
  },
  priceTitle: { fontSize: 10, fontFamily: "Helvetica-Bold", color: C.ink, marginBottom: 3 },
  priceAmount: { fontSize: 20, fontFamily: "Helvetica-Bold", color: C.orange, marginBottom: 1 },
  priceDuration: { fontSize: 7.5, color: C.gray, marginBottom: 8 },
  priceFeatureRow: { flexDirection: "row", marginBottom: 4 },
  priceFeaturePlus: { color: C.green, fontSize: 10, marginRight: 4, marginTop: -1 },
  priceFeatureText: { fontSize: 8, color: "#374151", flex: 1, lineHeight: 1.4 },

  benefitsGrid: { flexDirection: "row", flexWrap: "wrap", marginTop: 4 },
  benefitItem: {
    width: "50%", flexDirection: "row",
    alignItems: "flex-start", paddingRight: 6, marginBottom: 6,
  },
  benefitDot: {
    width: 5, height: 5, borderRadius: 3,
    backgroundColor: C.orange, marginTop: 4, marginRight: 7,
  },
  benefitText: { fontSize: 9, lineHeight: 1.4, color: "#374151", flex: 1 },

  certBox: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: C.fgray, borderRadius: 8, padding: 12, marginTop: 14,
  },
  certIcon: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: C.orange, alignItems: "center",
    justifyContent: "center", marginRight: 12,
  },

  ctaBox: { backgroundColor: C.ink, borderRadius: 10, padding: 16, marginTop: 12 },
  ctaTitle: { color: C.white, fontSize: 13, fontFamily: "Helvetica-Bold", marginBottom: 6 },
  ctaLine: { color: "#D1D5DB", fontSize: 9, lineHeight: 1.5, marginBottom: 2 },
  ctaHL: { color: C.orange, fontFamily: "Helvetica-Bold" },

  fallbackBox: {
    backgroundColor: C.cream, borderWidth: 1,
    borderColor: C.creamBdr, borderRadius: 10, padding: 14,
  },
});

/* ─── Helpers ────────────────────────────────────────── */
function pickTeacher(courseId: string) {
  const index =
    courseId.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) %
    namedTeachers.length;
  return namedTeachers[index];
}

const Footer = () => (
  <View style={S.footer} fixed>
    <Text style={S.footerText}>
      SuperSheldon · {WEB} · WhatsApp {WA}
    </Text>
    <Text
      style={S.footerText}
      render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
    />
  </View>
);

/* ─── Component ──────────────────────────────────────── */
export default function CourseBrochurePDF({ course }: { course: Course }) {
  const teacher  = pickTeacher(course.id);
  const benefits = course.benefits?.length ? course.benefits : DEFAULT_BENEFITS;
  const chapters = course.chapters || [];
  const leftChs  = chapters.filter((_, i) => i % 2 === 0);
  const rightChs = chapters.filter((_, i) => i % 2 === 1);

  const coverStats = [
    { label: "Level",       value: course.level    || "All Levels" },
    { label: "Duration",    value: course.duration  || "Flexible" },
    { label: "Modules",     value: String(chapters.length || 10) },
    { label: "Certificate", value: "On Completion" },
  ];

  return (
    <Document
      title={`${course.title} — SuperSheldon Brochure`}
      author="SuperSheldon"
      subject={course.type}
    >
      {/* ── PAGE 1: COVER ────────────────────────────── */}
      <Page size="A4" style={S.page}>
        <View style={S.hero}>
          <View style={S.heroTopRow}>
            <Image src={LOGO} style={S.logo} />
            <Text style={S.heroBrochureLabel}>COURSE BROCHURE 2026</Text>
          </View>
          <Text style={S.heroEyebrow}>{(course.categ || "").toUpperCase()} PROGRAM</Text>
          <Text style={S.heroTitle}>{course.title}</Text>
          <View style={S.badgeRow}>
            <Text style={S.badge}>{course.type}</Text>
            {course.categ ? <Text style={S.badge}>{course.categ}</Text> : null}
          </View>
        </View>

        {/* Stats strip */}
        <View style={S.statsStrip}>
          {coverStats.map((s, i) => (
            <View key={s.label} style={i === coverStats.length - 1 ? S.statCellLast : S.statCell}>
              <Text style={S.statValue}>{s.value}</Text>
              <Text style={S.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Overview + instructor */}
        <View style={S.body}>
          <Text style={S.sectionTitle}>Course Overview</Text>
          <View style={S.sectionAccent} />
          <Text style={S.paragraph}>{course.desc}</Text>

          <View style={S.instructorBox}>
            <View style={S.instructorAvatar}>
              <Text style={S.instructorInitial}>
                {teacher?.name?.charAt(0) || "S"}
              </Text>
            </View>
            <View>
              <Text style={S.metaLabel}>YOUR INSTRUCTOR</Text>
              <Text style={S.metaValue}>{teacher?.name || "SuperSheldon Tutor"}</Text>
              <Text style={{ fontSize: 8.5, color: C.gray, marginTop: 1 }}>
                {teacher?.subject || "Expert Tutor"}
              </Text>
            </View>
          </View>
        </View>

        <Footer />
      </Page>

      {/* ── PAGE 2: CURRICULUM ───────────────────────── */}
      <Page size="A4" style={S.page}>
        <View style={S.topStripe} />
        <View style={[S.body, { paddingTop: 22 }]}>
          <Text style={S.sectionTitle}>Course Curriculum</Text>
          <View style={S.sectionAccent} />
          <Text style={[S.paragraph, { marginBottom: 14 }]}>
            {chapters.length} modules designed to build mastery step by step.
          </Text>
        </View>

        <View style={S.curriculumCols}>
          {/* Left column — odd indices */}
          <View style={S.colLeft}>
            {leftChs.map((ch, i) => {
              const idx    = i * 2;
              const catKey = ch.category || "";
              const cat    = CAT[catKey];
              return (
                <View key={idx} style={S.moduleCard} wrap={false}>
                  <View style={S.moduleTopRow}>
                    <View style={S.moduleNum}>
                      <Text style={S.moduleNumText}>{String(idx + 1).padStart(2, "0")}</Text>
                    </View>
                    {cat ? (
                      <View style={[S.catTag, { backgroundColor: cat.bg }]}>
                        <Text style={[S.catTagText, { color: cat.fg }]}>{catKey}</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={S.moduleTitle}>{ch.title}</Text>
                  {ch.description ? <Text style={S.moduleDesc}>{ch.description}</Text> : null}
                  {ch.relevancy ? (
                    <View style={S.relevancyBox}>
                      <Text style={S.relevancyLabel}>WHY IT MATTERS</Text>
                      <Text style={S.relevancyText}>{ch.relevancy}</Text>
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>

          {/* Right column — even indices */}
          <View style={S.colRight}>
            {rightChs.map((ch, i) => {
              const idx    = i * 2 + 1;
              const catKey = ch.category || "";
              const cat    = CAT[catKey];
              return (
                <View key={idx} style={S.moduleCard} wrap={false}>
                  <View style={S.moduleTopRow}>
                    <View style={S.moduleNum}>
                      <Text style={S.moduleNumText}>{String(idx + 1).padStart(2, "0")}</Text>
                    </View>
                    {cat ? (
                      <View style={[S.catTag, { backgroundColor: cat.bg }]}>
                        <Text style={[S.catTagText, { color: cat.fg }]}>{catKey}</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={S.moduleTitle}>{ch.title}</Text>
                  {ch.description ? <Text style={S.moduleDesc}>{ch.description}</Text> : null}
                  {ch.relevancy ? (
                    <View style={S.relevancyBox}>
                      <Text style={S.relevancyLabel}>WHY IT MATTERS</Text>
                      <Text style={S.relevancyText}>{ch.relevancy}</Text>
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>
        </View>

        <Footer />
      </Page>

      {/* ── PAGE 3: PRICING + VALUE ───────────────────── */}
      <Page size="A4" style={S.page}>
        <View style={S.topStripe} />
        <View style={[S.body, { paddingTop: 22 }]}>

          <Text style={S.sectionTitle}>Plans &amp; Pricing</Text>
          <View style={S.sectionAccent} />

          {course.pricing && course.pricing.length > 0 ? (
            <View style={S.pricingRow}>
              {course.pricing.map((plan, i) => (
                <View key={i} style={plan.isRecommended ? S.priceCardRec : S.priceCard}>
                  {plan.tag ? <Text style={S.priceBadge}>{plan.tag}</Text> : null}
                  <Text style={S.priceTitle}>{plan.title}</Text>
                  <Text style={S.priceAmount}>{plan.price}</Text>
                  <Text style={S.priceDuration}>{plan.duration}</Text>
                  {plan.features.map((f, fi) => (
                    <View key={fi} style={S.priceFeatureRow}>
                      <Text style={S.priceFeaturePlus}>+</Text>
                      <Text style={S.priceFeatureText}>{f}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ) : (
            <View style={S.fallbackBox}>
              <Text style={[S.paragraph, { marginBottom: 4 }]}>
                Flexible plans tailored to your child&apos;s needs — 1:1 mentorship, weekly classes and assessments.
              </Text>
              <Text style={{ fontSize: 9.5, color: C.orangeDk, fontFamily: "Helvetica-Bold" }}>
                Contact us on WhatsApp {WA} for current pricing.
              </Text>
            </View>
          )}

          {/* Benefits 2-col */}
          <View style={{ marginTop: 22 }}>
            <Text style={S.sectionTitle}>What You&apos;ll Gain</Text>
            <View style={S.sectionAccent} />
            <View style={S.benefitsGrid}>
              {benefits.map((b, i) => (
                <View key={i} style={S.benefitItem}>
                  <View style={S.benefitDot} />
                  <Text style={S.benefitText}>{b}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Certificate */}
          <View style={S.certBox}>
            <View style={S.certIcon}>
              <Text style={{ color: C.white, fontSize: 13, fontFamily: "Helvetica-Bold" }}>★</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={S.metaValue}>Certificate of Completion</Text>
              <Text style={{ fontSize: 8.5, color: C.gray, marginTop: 2, lineHeight: 1.4 }}>
                Every student earns a verifiable SuperSheldon certificate on finishing the program.
              </Text>
            </View>
          </View>

          {/* CTA */}
          <View style={S.ctaBox}>
            <Text style={S.ctaTitle}>Ready to enrol?</Text>
            <Text style={S.ctaLine}>
              Book a free demo class at{" "}
              <Text style={S.ctaHL}>{DEMO}</Text>
            </Text>
            <Text style={S.ctaLine}>
              Message us on WhatsApp{" "}
              <Text style={S.ctaHL}>{WA}</Text>
            </Text>
            <Text style={S.ctaLine}>
              Learn more at{" "}
              <Text style={S.ctaHL}>{WEB}</Text>
            </Text>
          </View>
        </View>

        <Footer />
      </Page>
    </Document>
  );
}
