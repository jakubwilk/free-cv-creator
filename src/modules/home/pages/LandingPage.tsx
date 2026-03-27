'use client';
import { useActiveSection } from '@common/hooks';
import { useDisclosure } from '@mantine/hooks';
import { IconHelpCircle, IconShieldLock } from '@tabler/icons-react';

import {
  FaqModal,
  FeaturesSection,
  HeroSection,
  HowItWorksSection,
  LandingFooter,
  LandingNavbar,
  PrivacyModal,
} from '../components';

const NAV_SECTIONS = ['how-it-works', 'features'];

export function LandingPage() {
  const [privacyOpened, { open: openPrivacy, close: closePrivacy }] = useDisclosure(false);
  const [faqOpened, { open: openFaq, close: closeFaq }] = useDisclosure(false);

  useActiveSection(NAV_SECTIONS);

  return (
    <>
      <PrivacyModal
        opened={privacyOpened}
        onClose={closePrivacy}
        icon={<IconShieldLock size={22} />}
      />
      <FaqModal opened={faqOpened} onClose={closeFaq} icon={<IconHelpCircle size={22} />} />
      <LandingNavbar onPrivacyOpen={openPrivacy} onFaqOpen={openFaq} />
      <main id="main-content">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        {/* PrivacySection removed — now in modal */}
        {/* FaqSection removed — now in modal */}
        {/* TemplateShowcaseSection removed */}
        {/* FinalCtaSection removed */}
      </main>
      <LandingFooter />
    </>
  );
}
