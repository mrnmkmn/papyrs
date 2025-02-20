<script lang="ts">
  import Avatar from '$lib/components/core/Avatar.svelte';
  import Popover from '$lib/components/ui/Popover.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import {user} from '$lib/stores/user.store';
  import {i18n} from '$lib/stores/i18n.store';
  import {signUserOut} from '$lib/services/auth.services';
  import IconSignOut from '$lib/components/icons/IconSignOut.svelte';
  import {goto} from '$app/navigation';
  import IconSettings from '$lib/components/icons/IconSettings.svelte';
  import {sync} from '$lib/stores/sync.store';
  import Dirty from '$lib/components/toolbar/Dirty.svelte';
  import IconCreditCard from '$lib/components/icons/IconCreditCard.svelte';
  import IconSignIn from '$lib/components/icons/IconSignIn.svelte';
  import {auth} from '$lib/stores/auth.store';
  import IconMore from '../icons/IconMore.svelte';

  let visible: boolean | undefined;
  let button: HTMLButtonElement | undefined;

  const signOut = async () => {
    await signUserOut({clearLocalEdit: true});

    visible = false;
  };
</script>

<Button on:click={() => (visible = true)} bind:button>
  <svelte:fragment slot="icon">
    {#if $auth.loggedIn}
      <Avatar />
    {:else}
      <IconMore />
    {/if}
  </svelte:fragment>

  {$auth.loggedIn ? $user?.name ?? $i18n.tools.user : $i18n.nav.more}
</Button>

<Popover bind:visible anchor={button} direction="rtl">
  {#if $sync.dirty}
    <Dirty />
  {:else}
    <button
      type="button"
      role="menuitem"
      aria-haspopup="menu"
      on:click={async () => await goto('/settings')}
      class="menu">
      <IconSettings />
      <span>{$i18n.nav.settings}</span>
    </button>

    {#if $auth.loggedIn}
      <button
        type="button"
        role="menuitem"
        aria-haspopup="menu"
        on:click={async () => await goto('/billing')}
        class="menu">
        <IconCreditCard />
        <span>{$i18n.nav.billing}</span>
      </button>

      <button
        type="button"
        role="menuitem"
        aria-haspopup="menu"
        on:click={async () => await signOut()}
        class="menu">
        <IconSignOut />
        <span>{$i18n.nav.sign_out}</span>
      </button>
    {:else}
      <button
        type="button"
        role="menuitem"
        aria-haspopup="menu"
        on:click={async () => await goto('/signin')}
        class="menu">
        <IconSignIn />
        <span>{$i18n.nav.sign_in}</span>
      </button>
    {/if}
  {/if}
</Popover>
