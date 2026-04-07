import { Box, Group } from '@mantine/core';

export function HeroMockup() {
  return (
    <Box
      className="hero-mockup-float mx-auto filter-[drop-shadow(0_24px_48px_rgba(0,0,0,0.15))]"
      maw={340}
    >
      <Box
        className="relative overflow-hidden w-full rounded-lg aspect-[1/1.414] bg-white"
        style={{ border: '1px solid var(--mantine-color-gray-2)' }}
      >
        {/* Blue header */}
        <Box className="flex flex-col justify-center gap-[6px] px-5 py-4 h-[22%]" bg="blue.6">
          <Box className="h-[14px] w-[60%] rounded bg-white/90" />
          <Box className="h-[9px] w-[40%] rounded bg-white/60" />
          <Box className="h-[8px] w-[50%] rounded mt-[2px] bg-white/50" />
        </Box>

        {/* Content area */}
        <Box className="flex flex-col gap-3 px-5 py-4">
          <Box className="h-[7px] w-[35%] rounded" bg="blue.6" />
          {[80, 65, 55].map((w, i) => (
            <Box key={i} className="h-[7px] rounded" bg="gray.2" style={{ width: `${w}%` }} />
          ))}

          <Box className="mt-[6px]">
            <Box className="h-[7px] w-[30%] rounded mb-2" bg="blue.6" />
            {[70, 60, 50, 75].map((w, i) => (
              <Box
                key={i}
                className="h-[7px] rounded mb-[6px]"
                bg="gray.2"
                style={{ width: `${w}%` }}
              />
            ))}
          </Box>

          <Box className="mt-[6px]">
            <Box className="h-[7px] w-[40%] rounded mb-2" bg="blue.6" />
            <Group gap={6} wrap="wrap">
              {[45, 35, 50, 30, 55].map((w, i) => (
                <Box
                  key={i}
                  className="h-5 rounded-full"
                  bg="blue.0"
                  style={{ border: '1px solid var(--mantine-color-blue-2)', width: `${w}%` }}
                />
              ))}
            </Group>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
