import { AnchorHeading, useAnchorScroll } from "@/components/AnchorHeading";

const Installation = () => {
  useAnchorScroll();

  return (
    <div className="prose prose-invert max-w-none">
      <AnchorHeading id="installation" level={1}>
        Installation
      </AnchorHeading>
      <p className="text-lg text-muted-foreground mb-8">
        Get Froststrap working easily on your supported platform.
      </p>
      <AnchorHeading id="system-requirements" level={2}>
        System Requirements
      </AnchorHeading>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
        <li>Windows 10 (LTSC, 22H2 is not supported) or later (64-bit)</li>
        <li>macOS 14 (Sonoma) or later (Intel or Apple Silicon)</li>
        <li>Linux (64-bit)</li>
        <li>.NET 10</li>
      </ul>
      <p className="text-sm text-muted-foreground mb-6">
        {" "}
        <strong>Note:</strong> macOS and Linux users do not need to install .NET
        10 separately. The Froststrap binaries for these platforms are
        self-contained and include the required .NET runtime.{" "}
      </p>
      <AnchorHeading id="supported-platforms" level={2}>
        Supported Platforms
      </AnchorHeading>
      <p className="text-muted-foreground mb-4">
        Froststrap currently provides official releases for Windows, macOS, and
        Linux.
      </p>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
        <li>
          <strong>Windows:</strong> x64 executable installer
        </li>
        <li>
          <strong>macOS:</strong> Intel (x64) and Apple Silicon (ARM64) packages
        </li>
        <li>
          <strong>Linux:</strong> x64 AppImage, DEB, and RPM packages
        </li>
      </ul>
      <AnchorHeading id="download" level={2}>
        Download
      </AnchorHeading>
      <div className="p-6 rounded-lg bg-card border border-border mb-6">
        <p className="text-muted-foreground mb-4">
          Download the latest version of Froststrap from our official GitHub
          releases page. Select the download that matches your operating system
          and architecture.
        </p>
        <a
          href="https://github.com/Froststrap/Froststrap/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Download Latest Release →
        </a>
      </div>
      <AnchorHeading id="installation-steps" level={2}>
        Installation Steps
      </AnchorHeading>
      <div className="space-y-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
            1
          </div>
          <div>
            <h3 className="font-semibold mb-2">Download Froststrap</h3>
            <p className="text-muted-foreground">
              Download the appropriate Froststrap release for your operating
              system from the official GitHub releases page.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
            2
          </div>
          <div>
            <h3 className="font-semibold mb-2">Install Froststrap</h3>
            <p className="text-muted-foreground">
              Follow the installation instructions for your platform below.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
            3
          </div>
          <div>
            <h3 className="font-semibold mb-2">Launch Froststrap</h3>
            <p className="text-muted-foreground">
              Once installed, launch Froststrap from your application menu,
              desktop, or start menu.
            </p>
          </div>
        </div>
      </div>
      <AnchorHeading id="windows" level={2}>
        Windows
      </AnchorHeading>
      <p className="text-muted-foreground mb-4">
        Windows users can download the <code>Froststrap-windows-x64.exe</code>{" "}
        release artifact, or install Froststrap through WinGet.
      </p>
      <div className="mb-4">
        <pre className="rounded-lg bg-card border border-border p-4 overflow-x-auto">
          <code>winget install Froststrap.Froststrap</code>
        </pre>
      </div>
      <p className="text-muted-foreground mb-6">
        If you downloaded the executable, run the file and follow the
        installation wizard. Once installation is complete, Froststrap can be
        launched from the Start Menu or desktop.
      </p>
      <AnchorHeading id="macos" level={2}>
        macOS
      </AnchorHeading>
      <p className="text-muted-foreground mb-4">
        macOS users can download the appropriate <code>.pkg</code> installer
        directly from the GitHub release artifacts.
      </p>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
        <li>
          <code>Froststrap-macos-arm64.pkg</code> — Apple Silicon Macs (M-series
          processors)
        </li>
        <li>
          <code>Froststrap-macos-x64.pkg</code> — Intel Macs
        </li>
      </ul>
      <p className="text-muted-foreground mb-6">
        Open the downloaded <code>.pkg</code> file and follow the macOS
        installation prompts. After installation, Froststrap can be launched
        from your Applications folder.
      </p>
      <AnchorHeading id="linux" level={2}>
        Linux
      </AnchorHeading>
      <p className="text-muted-foreground mb-4">
        Linux users can choose between AppImage, DEB, and RPM packages,
        depending on their distribution and preferred installation method.
      </p>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
        <li>
          <code>Froststrap-linux-x64.AppImage</code> — Portable AppImage
        </li>
        <li>
          <code>Froststrap-linux-x64.deb</code> — Debian, Ubuntu, Linux Mint,
          and other Debian-based distributions
        </li>
        <li>
          <code>Froststrap-linux-x64.rpm</code> — Fedora, openSUSE, and other
          RPM-based distributions
        </li>
      </ul>
      <p className="text-muted-foreground mb-6">
        Download the package appropriate for your distribution, install it using
        your distribution's package manager, or run the AppImage directly.
      </p>
      <AnchorHeading id="arch-linux" level={3}>
        Arch Linux
      </AnchorHeading>
      <p className="text-muted-foreground mb-4">
        Arch Linux users can install Froststrap from the community maintained
        Arch User Repository (AUR) using either the{" "}
        <a
          href="https://aur.archlinux.org/packages/froststrap"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          <code>froststrap</code>
        </a>{" "}
        or the{" "}
        <a
          href="https://aur.archlinux.org/packages/froststrap-bin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          <code>froststrap-bin</code>
        </a>{" "}
        package.
      </p>
      <AnchorHeading id="nixos" level={3}>
        {" "}
        NixOS{" "}
      </AnchorHeading>{" "}
      <p className="text-muted-foreground mb-4">
        {" "}
        NixOS users can install Froststrap using the Nix flake provided in the
        official Froststrap repository.{" "}
      </p>{" "}
      <p className="text-muted-foreground mb-4">
        {" "}
        To run Froststrap directly from the flake without adding it to your
        system configuration:{" "}
      </p>{" "}
      <pre className="rounded-lg bg-card border border-border p-4 overflow-x-auto mb-6">
        {" "}
        <code>{`nix run github:Froststrap/Froststrap`}</code>{" "}
      </pre>{" "}
      <p className="text-muted-foreground mb-4">
        {" "}
        To add Froststrap to a NixOS configuration, add the repository as a
        flake input:{" "}
      </p>{" "}
      <pre className="rounded-lg bg-card border border-border p-4 overflow-x-auto mb-6">
        {" "}
        <code>{`inputs = { froststrap.url = "github:Froststrap/Froststrap"; };`}</code>{" "}
      </pre>{" "}
      <p className="text-muted-foreground mb-4">
        {" "}
        Then add Froststrap to your system packages:{" "}
      </p>{" "}
      <pre className="rounded-lg bg-card border border-border p-4 overflow-x-auto mb-6">
        {" "}
        <code>{`environment.systemPackages = [ inputs.froststrap.packages.\${pkgs.system}.default ];`}</code>{" "}
      </pre>{" "}
      <p className="text-muted-foreground mb-4">
        {" "}
        Finally, rebuild your system:{" "}
      </p>{" "}
      <pre className="rounded-lg bg-card border border-border p-4 overflow-x-auto mb-6">
        {" "}
        <code>{`sudo nixos-rebuild switch --flake .`}</code>{" "}
      </pre>{" "}
      <AnchorHeading id="home-manager" level={4}>
        {" "}
        Home Manager{" "}
      </AnchorHeading>{" "}
      <p className="text-muted-foreground mb-4">
        {" "}
        If you use Home Manager, you can also install Froststrap without adding
        it to your system-wide packages. Add the Froststrap flake as an input to
        your Home Manager configuration:{" "}
      </p>{" "}
      <pre className="rounded-lg bg-card border border-border p-4 overflow-x-auto mb-6">
        {" "}
        <code>{`inputs = { froststrap.url = "github:Froststrap/Froststrap"; };`}</code>{" "}
      </pre>{" "}
      <p className="text-muted-foreground mb-4">
        {" "}
        Then add the Froststrap package to <code>home.packages</code>:{" "}
      </p>{" "}
      <pre className="rounded-lg bg-card border border-border p-4 overflow-x-auto mb-6">
        {" "}
        <code>{`home.packages = [ inputs.froststrap.packages.\${pkgs.system}.default ];`}</code>{" "}
      </pre>{" "}
      <p className="text-muted-foreground mb-4">
        {" "}
        Apply your Home Manager configuration:{" "}
      </p>{" "}
      <pre className="rounded-lg bg-card border border-border p-4 overflow-x-auto mb-6">
        {" "}
        <code>{`home-manager switch --flake .`}</code>{" "}
      </pre>{" "}
      <p className="text-muted-foreground mb-6">
        {" "}
        Froststrap will then be available as a normal application in your user
        environment.{" "}
      </p>
      <div className="mt-8 p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-bold mb-2">Next Steps</h3>
        <p className="text-muted-foreground mb-4">
          Now that Froststrap is installed, check out some of our features.
        </p>
        <a
          href="/docs/guide/features"
          className="text-primary hover:underline font-medium"
        >
          Configuration Guide →
        </a>
      </div>
    </div>
  );
};

export default Installation;
