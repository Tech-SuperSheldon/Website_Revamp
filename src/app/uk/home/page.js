// Simple UK hero page — previously mounted at /uk before it was swapped with
// the full UK homepage (src/app/uk/page.js), which now owns that URL. Kept
// at /uk/home so the URL still resolves to something rather than 404ing.
import UK_Hero from "@/components/Regional/UK_Hero";

export default function UKHomeSimplePage() {
    return (
        <div>
                <UK_Hero/>
        </div>
    );
}
