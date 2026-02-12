/**
 * Animation timing constants and configuration values
 * Centralized place for all magic numbers related to animations and UI behavior
 */

// Animation durations (in seconds)
export const ANIMATION_DURATIONS = {
  HEART_ROTATE: 10,
  INTRO_IMAGE_BOUNCE: 4,
  FLOATING_HEARTS_MIN: 15,
  FLOATING_HEARTS_MAX: 25,
  SUCCESS_ANIMATION: 2,
  LOGIN_TRANSITION: 0.6,
  TEXT_FADE: 0.5,
  BUTTON_SPRING_STIFFNESS: 80,
  BUTTON_SPRING_DAMPING: 15,
} as const;

// Floating hearts configuration
export const FLOATING_HEARTS = {
  ELEMENT_COUNT: 25,
  INITIAL_DELAY_MAX: 20,
  SCALE_MIN: 0.5,
  SCALE_MAX: 1,
  SIZE_MIN: 12,
  SIZE_MAX: 36,
  FLOWER_SIZE_MIN: 15,
  FLOWER_SIZE_MAX: 45,
} as const;

// Valentine question configuration
export const VALENTINE_QUESTION = {
  MAX_NO_CLICKS: 14, // Cap noCount at this value
  IMAGE_FADE_THRESHOLD: 8,
  TEXT_FADE_THRESHOLD: 10,
  SCREEN_COVER_THRESHOLD: 14,
  NO_BUTTON_MOVE_RANGE: 500,
  YES_BUTTON_SCALE_MULTIPLIER: 0.4,
  NO_PHRASES: [
    'No',
    'Are you sure?',
    'Really sure?',
    'BUT WHY?',
    'HAW',
    'Surely not?',
    'How can you do this to me?!',
    'Give it another thought!',
    'Are you absolutely sure?',
    'EVIL',
    'Have a heart!',
    "Don't be so cold!",
    'Change of heart?',
    'Is that your final answer?',
    "You're breaking my heart ;(",
  ],
} as const;

// Login screen configuration
export const LOGIN_CONFIG = {
  TIMER_UPDATE_INTERVAL: 1000,
  AUTO_UNLOCK_DELAY: 600,
  PASSWORD_REVEAL_TIMEOUT: 1000,
} as const;

// Image loading configuration
export const IMAGE_CONFIG = {
  BLUR_DURATION: 300,
  BLUR_RADIUS: 10,
  PLACEHOLDER_BG_COLOR: '#f3e8ff', // Light pink/rose tone
} as const;

// Audio configuration
export const AUDIO_CONFIG = {
  DEFAULT_VOLUME: 0.3,
  PLAY_ERROR_TIMEOUT: 2000, // Show error feedback for 2 seconds
} as const;

// Spring physics for animations
export const SPRING_CONFIG = {
  GENTLE: { stiffness: 80, damping: 15, mass: 1 },
  SNAPPY: { stiffness: 500, damping: 30 },
  BOUNCY: { stiffness: 140, damping: 10 },
} as const;
