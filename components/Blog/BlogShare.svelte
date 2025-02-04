<script lang="ts">
  import type { Locale } from '~/locales'

  import { useTranslations } from '~/utils/use-translations'
  import LinkedinIcon from '~/icons/linkedin.svg?raw'
  import Portal from '~/components/Portal.svelte'
  import CrossIcon from '~/icons/cross.svg?raw'
  import ShareIcon from '~/icons/share.svg?raw'
  import XIcon from '~/icons/x.svg?raw'

  export let description: string
  export let locale: Locale
  export let title: string
  export let url: URL

  $: t = useTranslations(locale, 'blog')

  let e = encodeURI
  let dialog: HTMLDialogElement

  $: cleanUrl = url?.toString().replace(/\.html$/, '')
  $: xUsername = locale === 'ru' ? 'azat_io' : 'azat_io_en'

  $: links = [
    {
      icon: XIcon,
      link: `https://x.com/intent/tweet?text=${e(
        `${title}\n\n${t('quote-start')}${description}${t('quote-end')} ${t(
          'by',
        )} @${xUsername}\n\n`,
      )}&url=${cleanUrl}`,
      label: 'share-on-x',
      name: 'X',
    },
    {
      icon: LinkedinIcon,
      link: `https://linkedin.com/sharing/share-offsite/?url=${cleanUrl}`,
      label: 'share-on-linkedin',
      name: 'LinkedIn',
    },
  ] as const

  let share = () => {
    if (
      !/android|iphone|ipad|ipod/i.test(navigator.userAgent) ||
      navigator.share === undefined
    ) {
      dialog.showModal()
    } else {
      navigator.share({
        text: description,
        url: cleanUrl!,
        title,
      })
    }
  }

  let closeDialog = () => {
    dialog.close()
  }
</script>

<div class="share-wrapper">
  <button data-umami-event="Share" class="share" on:click={share}>
    {@html ShareIcon}
    <span>{t('share')}</span>
  </button>
</div>
<Portal>
  <dialog class="dialog" bind:this={dialog} tabindex="-1">
    <button class="paranja" on:click={closeDialog} tabindex="-1" />
    <div class="popup">
      <button class="close" on:click={closeDialog}>
        {@html CrossIcon}
      </button>
      <h3 class="title">{t('share')}</h3>
      <ul class="links">
        {#each links as { label, link, icon, name }}
          <li>
            <a
              data-umami-event="Share on social media"
              aria-label={t(label).toString()}
              data-umami-event-name={name}
              rel="noopener noreferrer"
              target="_blank"
              class="link"
              href={link}
            >
              {@html icon}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </dialog>
</Portal>

<style>
  .share-wrapper {
    display: flex;

    @media (width >= 768px) {
      place-content: end;
    }
  }

  .share {
    display: flex;
    gap: var(--space-s);
    place-items: center;
    padding-inline: 0;
    color: var(--color-content-link);
    background: transparent;
    border: none;
    border-block-end: none;
    border-radius: var(--border-radius);
    outline: none;
    transition: box-shadow 200ms;

    :global(svg) {
      display: flex;
      inline-size: 2ch;
      block-size: 2ch;
    }

    &:hover {
      color: var(--color-content-link-hover);
    }

    &:focus-visible {
      background: var(--color-overlay-brand);
      box-shadow: 0 0 0 2px var(--color-border-brand);
    }

    @media (width >= 768px) {
      flex-direction: row-reverse;
    }
  }

  .dialog {
    position: fixed;
    inset: 0;
    inline-size: 100vi;
    max-inline-size: 100%;
    block-size: 100dvb;
    max-block-size: 100%;
    padding: 0;
    margin: 0;
    background: transparent;
    border: none;
  }

  .paranja {
    position: absolute;
    inset: 0;
    inline-size: 100%;
    block-size: 100%;
    background: var(--color-overlay-primary);
    border: none;
    outline: none;
    animation: fade-in 500ms cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }

  .popup {
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
    place-items: center;
    min-inline-size: 280px;
    padding: var(--space-l) var(--space-xl);
    margin-inline-end: -50%;
    background: var(--color-background-secondary);
    border: 1px solid var(--color-border-primary);
    border-radius: var(--border-radius);
    opacity: 0%;
    transform: scale(0.8) translate(-50%, 800px) translateZ(0);
    transform-origin: 0 0;
    animation: scale-up 300ms cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    will-change: opacity, transform;
  }

  .close {
    position: absolute;
    inset-block-start: var(--space-s);
    inset-inline-end: var(--space-s);
    display: flex;
    padding: var(--space-xs);
    color: var(--color-content-primary);
    background: transparent;
    border: none;
    border-radius: var(--border-radius);
    outline: none;
    transition: all 250ms;

    :global(svg) {
      inline-size: 24px;
      block-size: 24px;
    }

    &:focus-visible {
      background: var(--color-overlay-brand);
      box-shadow: 0 0 0 2px var(--color-border-brand);
      transition-property: box-shadow;
    }
  }

  .title {
    margin-block: 0;
    font: var(--font-l);
    font-weight: 700;
    color: var(--color-content-primary);
  }

  .links {
    display: flex;
    gap: var(--space-2xs);
    padding-inline-start: 0;
    margin-block: 0;
    list-style: none;
  }

  .link {
    display: flex;
    padding: var(--space-xs);
    color: var(--color-content-primary);
    border-block-end: none;
    border-radius: var(--border-radius);

    :global(svg) {
      inline-size: 28px;
      block-size: 28px;
    }
  }

  .close:hover,
  .link:hover {
    color: var(--color-content-brand);
    background: var(--color-background-primary-hover);
  }

  @keyframes fade-in {
    0% {
      opacity: 0%;
    }

    100% {
      opacity: 100%;
    }
  }

  @keyframes scale-up {
    0% {
      opacity: 0%;
      transform: scale(0.8) translate(-50%, 800px) translateZ(0);
    }

    50% {
      opacity: 0%;
    }

    100% {
      opacity: 100%;
      transform: scale(1) translate(-50%, -75%) translateZ(0);
    }
  }
</style>
