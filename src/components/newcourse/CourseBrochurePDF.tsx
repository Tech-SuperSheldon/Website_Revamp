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

/* ------------------------------------------------------------------ */
/*  Brand constants                                                    */
/* ------------------------------------------------------------------ */

const COLORS = {
  orange: "#f97316",
  orangeDark: "#ea580c",
  cream: "#FFF9F3",
  ink: "#111827",
  gray: "#6B7280",
  lightGray: "#E5E7EB",
  faintGray: "#F3F4F6",
  white: "#FFFFFF",
  green: "#16A34A",
};

const LOGO_SRC = "/Final-Logo-bg-removed.png";
const WEBSITE = "supersheldon.com";
const WHATSAPP = "+91 7974695618";
const DEMO_URL = "supersheldon.com/demo";

// Fallback benefits — mirrors NSCourseDetailAU.tsx so the PDF matches the site.
const DEFAULT_BENEFITS = [
  "Learn key concepts from the ground up — no prior experience required.",
  "Master problem-solving techniques for higher scores.",
  "Understand how to approach complex questions with confidence.",
  "Save time with smart strategies and shortcuts.",
  "Gain practical experience with real-world Australian curriculum questions.",
  "Track progress with regular assessments and feedback.",
];

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: COLORS.ink,
    backgroundColor: COLORS.white,
    paddingBottom: 56,
  },

  /* Hero (cover) */
  hero: {
    backgroundColor: COLORS.orange,
    paddingHorizontal: 40,
    paddingTop: 36,
    paddingBottom: 32,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  logo: { height: 34, objectFit: "contain" },
  heroBrandText: {
    color: COLORS.white,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
    textAlign: "right",
  },
  heroEyebrow: {
    color: COLORS.white,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 2,
    textTransform: "uppercase",
    opacity: 0.9,
    marginBottom: 8,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 30,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1.15,
    marginBottom: 14,
  },
  badgeRow: { flexDirection: "row" },
  badge: {
    backgroundColor: "rgba(255,255,255,0.22)",
    color: COLORS.white,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 8,
  },

  /* Generic content padding */
  body: { paddingHorizontal: 40, paddingTop: 26 },

  sectionTitle: {
    fontSize: 15,
    fontFamily: "Helvetica-Bold",
    color: COLORS.ink,
    marginBottom: 14,
  },
  sectionTitleAccent: {
    width: 32,
    height: 3,
    backgroundColor: COLORS.orange,
    borderRadius: 2,
    marginBottom: 14,
    marginTop: -8,
  },

  /* Meta grid */
  metaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginHorizontal: -6,
    marginBottom: 22,
  },
  metaCell: {
    width: "33.33%",
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  metaBox: {
    backgroundColor: COLORS.faintGray,
    borderRadius: 8,
    padding: 10,
  },
  metaLabel: {
    fontSize: 7.5,
    color: COLORS.gray,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: COLORS.ink,
  },

  paragraph: { fontSize: 10.5, lineHeight: 1.6, color: "#374151" },

  /* Instructor */
  instructorBox: {
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cream,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FCE8D6",
    padding: 16,
  },
  instructorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.orange,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  instructorInitial: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
  },

  /* Modules */
  moduleRow: {
    flexDirection: "row",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.faintGray,
  },
  moduleNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.orange,
    color: COLORS.white,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    paddingTop: 6,
    marginRight: 12,
  },
  moduleTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: COLORS.ink,
    marginBottom: 3,
  },
  moduleDesc: { fontSize: 9.5, lineHeight: 1.5, color: COLORS.gray },

  /* Pricing */
  pricingRow: { flexDirection: "row", marginHorizontal: -5 },
  priceCard: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    padding: 12,
  },
  priceCardRec: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: COLORS.orange,
    borderRadius: 10,
    padding: 12,
    backgroundColor: COLORS.cream,
  },
  priceTag: {
    alignSelf: "flex-start",
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: COLORS.orangeDark,
    textTransform: "uppercase",
    letterSpacing: 1,
    backgroundColor: "#FCE8D6",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 10,
    marginBottom: 6,
  },
  priceTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: COLORS.ink,
    marginBottom: 4,
  },
  priceAmount: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: COLORS.orange,
  },
  priceDuration: { fontSize: 8, color: COLORS.gray, marginBottom: 8 },
  priceFeature: {
    fontSize: 8.5,
    color: "#374151",
    lineHeight: 1.4,
    marginBottom: 4,
    flexDirection: "row",
  },

  fallbackBox: {
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: "#FCE8D6",
    borderRadius: 10,
    padding: 16,
  },

  /* Benefits */
  benefitRow: { flexDirection: "row", marginBottom: 7, alignItems: "flex-start" },
  benefitDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.orange,
    marginTop: 4,
    marginRight: 8,
  },
  benefitText: { fontSize: 10, lineHeight: 1.5, color: "#374151", flex: 1 },

  /* Certificate */
  certBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.faintGray,
    borderRadius: 10,
    padding: 14,
    marginTop: 4,
  },

  /* CTA */
  ctaBox: {
    backgroundColor: COLORS.ink,
    borderRadius: 12,
    padding: 18,
    marginTop: 18,
  },
  ctaTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
  },
  ctaText: { color: "#D1D5DB", fontSize: 9.5, lineHeight: 1.5 },
  ctaHighlight: { color: COLORS.orange, fontFamily: "Helvetica-Bold" },

  /* Footer (fixed) */
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    paddingHorizontal: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  footerText: { fontSize: 8, color: COLORS.gray },
  footerBrand: { fontSize: 8, color: COLORS.orange, fontFamily: "Helvetica-Bold" },
});

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function pickTeacher(courseId: string) {
  // Same deterministic selection used in NSCourseSidebar.tsx
  const index =
    courseId.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) %
    namedTeachers.length;
  return namedTeachers[index];
}

const Footer = () => (
  <View style={styles.footer} fixed>
    <Text style={styles.footerText}>
      SuperSheldon · {WEBSITE} · WhatsApp {WHATSAPP}
    </Text>
    <Text
      style={styles.footerText}
      render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
    />
  </View>
);

/* ------------------------------------------------------------------ */
/*  Document                                                           */
/* ------------------------------------------------------------------ */

export default function CourseBrochurePDF({ course }: { course: Course }) {
  const teacher = pickTeacher(course.id);
  const benefits =
    course.benefits && course.benefits.length > 0
      ? course.benefits
      : DEFAULT_BENEFITS;

  const meta = [
    { label: "Level", value: course.level || "All Levels" },
    { label: "Lessons", value: `${course.chapters?.length || 10}` },
    { label: "Duration", value: course.duration || "Flexible" },
    { label: "Resources", value: `${course.resourcesCount || 3} files` },
    { label: "Certificate", value: "On Completion" },
    { label: "Updated", value: course.lastUpdated || "2026" },
  ];

  return (
    <Document
      title={`${course.title} — SuperSheldon Brochure`}
      author="SuperSheldon"
      subject={course.type}
    >
      {/* ---------- PAGE 1 : COVER ---------- */}
      <Page size="A4" style={styles.page}>
        <View style={styles.hero}>
          <View style={styles.heroTopRow}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image src={LOGO_SRC} style={styles.logo} />
            <Text style={styles.heroBrandText}>COURSE BROCHURE</Text>
          </View>

          <Text style={styles.heroEyebrow}>{course.categ} Program</Text>
          <Text style={styles.heroTitle}>{course.title}</Text>
          <View style={styles.badgeRow}>
            <Text style={styles.badge}>{course.type}</Text>
            <Text style={styles.badge}>{course.categ}</Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* Meta grid */}
          <View style={styles.metaGrid}>
            {meta.map((m) => (
              <View key={m.label} style={styles.metaCell}>
                <View style={styles.metaBox}>
                  <Text style={styles.metaLabel}>{m.label}</Text>
                  <Text style={styles.metaValue}>{m.value}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Overview */}
          <Text style={styles.sectionTitle}>Course Overview</Text>
          <View style={styles.sectionTitleAccent} />
          <Text style={styles.paragraph}>{course.desc}</Text>

          {/* Instructor */}
          <View style={styles.instructorBox}>
            <View style={styles.instructorAvatar}>
              <Text style={styles.instructorInitial}>
                {teacher?.name?.charAt(0) || "S"}
              </Text>
            </View>
            <View>
              <Text style={styles.metaLabel}>Your Instructor</Text>
              <Text style={styles.metaValue}>{teacher?.name}</Text>
              <Text style={{ fontSize: 9, color: COLORS.gray, marginTop: 2 }}>
                {teacher?.subject}
              </Text>
            </View>
          </View>
        </View>

        <Footer />
      </Page>

      {/* ---------- PAGE 2 : CURRICULUM ---------- */}
      <Page size="A4" style={styles.page}>
        <View style={styles.body}>
          <Text style={styles.sectionTitle}>Course Curriculum</Text>
          <View style={styles.sectionTitleAccent} />
          <Text style={[styles.paragraph, { marginBottom: 18 }]}>
            {course.chapters?.length || 10} modules designed to build mastery
            step by step.
          </Text>

          {(course.chapters || []).map((ch, i) => (
            <View key={i} style={styles.moduleRow} wrap={false}>
              <Text style={styles.moduleNum}>{i + 1}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.moduleTitle}>{ch.title}</Text>
                {ch.description ? (
                  <Text style={styles.moduleDesc}>{ch.description}</Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>

        <Footer />
      </Page>

      {/* ---------- PAGE 3 : PRICING + VALUE ---------- */}
      <Page size="A4" style={styles.page}>
        <View style={styles.body}>
          {/* Pricing */}
          <Text style={styles.sectionTitle}>Plans &amp; Pricing</Text>
          <View style={styles.sectionTitleAccent} />

          {course.pricing && course.pricing.length > 0 ? (
            <View style={styles.pricingRow}>
              {course.pricing.map((plan, i) => (
                <View
                  key={i}
                  style={plan.isRecommended ? styles.priceCardRec : styles.priceCard}
                >
                  {plan.tag ? <Text style={styles.priceTag}>{plan.tag}</Text> : null}
                  <Text style={styles.priceTitle}>{plan.title}</Text>
                  <Text style={styles.priceAmount}>{plan.price}</Text>
                  <Text style={styles.priceDuration}>{plan.duration}</Text>
                  {plan.features.map((f, fi) => (
                    <View key={fi} style={styles.priceFeature}>
                      <Text style={{ color: COLORS.green, marginRight: 4 }}>+</Text>
                      <Text style={{ flex: 1 }}>{f}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.fallbackBox}>
              <Text style={[styles.paragraph, { marginBottom: 4 }]}>
                Flexible plans tailored to your child&apos;s needs — including
                1:1 mentorship, weekly classes and assessments.
              </Text>
              <Text style={{ fontSize: 10, color: COLORS.orangeDark, fontFamily: "Helvetica-Bold" }}>
                Contact us on WhatsApp {WHATSAPP} for current pricing.
              </Text>
            </View>
          )}

          {/* Benefits */}
          <View style={{ marginTop: 24 }}>
            <Text style={styles.sectionTitle}>What You&apos;ll Gain</Text>
            <View style={styles.sectionTitleAccent} />
            {benefits.map((b, i) => (
              <View key={i} style={styles.benefitRow}>
                <View style={styles.benefitDot} />
                <Text style={styles.benefitText}>{b}</Text>
              </View>
            ))}
          </View>

          {/* Certificate */}
          <View style={[styles.certBox, { marginTop: 16 }]}>
            <View style={[styles.instructorAvatar, { marginRight: 12 }]}>
              <Text style={styles.instructorInitial}>★</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.priceTitle}>Certificate of Completion</Text>
              <Text style={styles.moduleDesc}>
                Every student earns a verifiable SuperSheldon certificate on
                finishing the program.
              </Text>
            </View>
          </View>

          {/* CTA */}
          <View style={styles.ctaBox}>
            <Text style={styles.ctaTitle}>Ready to enrol?</Text>
            <Text style={styles.ctaText}>
              Book a free demo class at{" "}
              <Text style={styles.ctaHighlight}>{DEMO_URL}</Text> or message us on
              WhatsApp <Text style={styles.ctaHighlight}>{WHATSAPP}</Text>. Learn
              more at <Text style={styles.ctaHighlight}>{WEBSITE}</Text>.
            </Text>
          </View>
        </View>

        <Footer />
      </Page>
    </Document>
  );
}
