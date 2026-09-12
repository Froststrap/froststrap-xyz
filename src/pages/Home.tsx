import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Snowfall } from "react-snowfall";
import {
  CloudDownload,
  Download,
  FileText,
  Gamepad2,
  Globe2,
  MessageCircle,
  Palette,
  Settings,
  Users,
  Wrench,
  Laptop
} from "lucide-react";
import {
  FaApple,
  FaDiscord,
  FaGithub,
  FaLinux,
  FaWindows,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import logo from "@/assets/froststrap-logo.png";
import formatCompactNumber from "@/lib/formatNumber";

interface ReleaseData {
  version: string;
  downloadVersion: string;
  latestDownloads: number;
}

interface RepoStats {
  license: string;
  totalDownloads: number;
}

interface GithubAsset {
  name?: string;
  browser_download_url: string;
  download_count?: number;
}

interface GithubRelease {
  tag_name?: string;
  assets?: GithubAsset[];
}

interface GithubRepository {
  license?: {
    spdx_id?: string;
  };
}

type Platform = "windows" | "macos" | "linux" | "unknown";

const githubApiBase = "https://api.github.com/repos/Froststrap/Froststrap";
const cacheDuration = 5 * 60 * 1000;

const getCachedData = <T,>(key: string): T | null => {
  try {
    const cached = sessionStorage.getItem(key);

    if (!cached) {
      return null;
    }

    const parsed = JSON.parse(cached) as {
      timestamp: number;
      data: T;
    };

    if (Date.now() - parsed.timestamp > cacheDuration) {
      sessionStorage.removeItem(key);
      return null;
    }

    return parsed.data;
  } catch {
    return null;
  }
};

const setCachedData = <T,>(key: string, data: T) => {
  try {
    sessionStorage.setItem(
      key,
      JSON.stringify({
        timestamp: Date.now(),
        data,
      }),
    );
  } catch {
    // Ignore storage errors.
  }
};

const fetchGithub = async <T,>(url: string, cacheKey: string): Promise<T> => {
  const cached = getCachedData<T>(cacheKey);

  if (cached) {
    return cached;
  }

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed with status ${response.status}`);
  }

  const data = (await response.json()) as T;

  setCachedData(cacheKey, data);

  return data;
};

const getPlatform = (): Platform => {
  const platform = navigator.platform.toLowerCase();

  if (platform.includes("win")) {
    return "windows";
  }

  if (platform.includes("mac")) {
    return "macos";
  }

  if (platform.includes("linux")) {
    return "linux";
  }

  return "unknown";
};

const getPlatformIcon = (platform: Platform) => {
  switch (platform) {
    case "windows":
      return <FaWindows className="h-6 w-6" />;

    case "macos":
      return <FaApple className="h-6 w-6" />;

    case "linux":
      return <FaLinux className="h-6 w-6" />;

    default:
      return <Download className="h-6 w-6" />;
  }
};

const getAssetExtension = (platform: Platform): string | null => {
  switch (platform) {
    case "windows":
      return ".exe";

    case "macos":
      return ".pkg";

    case "linux":
      return ".appimage";

    default:
      return null;
  }
};

const findAsset = (
  release: GithubRelease,
  extension: string,
): GithubAsset | null => {
  return (
    release.assets?.find((asset) =>
      asset.name?.toLowerCase().endsWith(extension),
    ) ?? null
  );
};

export default function Home() {
  const [releaseData, setReleaseData] = useState<ReleaseData>({
    version: "loading...",
    downloadVersion: "loading...",
    latestDownloads: 0,
  });

  const [repoStats, setRepoStats] = useState<RepoStats>({
    license: "...",
    totalDownloads: 0,
  });

  const [platform, setPlatform] = useState<Platform>("unknown");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    const currentPlatform = getPlatform();

    setPlatform(currentPlatform);

    const loadGithubData = async () => {
      try {
        const latestRelease = await fetchGithub<GithubRelease>(
          `${githubApiBase}/releases/latest`,
          "froststrap-latest-release",
        );

        const latestDownloads =
          latestRelease.assets?.reduce(
            (total, asset) => total + (asset.download_count || 0),
            0,
          ) ?? 0;

        setReleaseData({
          version: latestRelease.tag_name || "latest",
          downloadVersion: latestRelease.tag_name || "latest",
          latestDownloads,
        });

        const extension = getAssetExtension(currentPlatform);

        if (extension) {
          let downloadRelease = latestRelease;
          let asset = findAsset(latestRelease, extension);

          if (!asset) {
            const releases = await fetchGithub<GithubRelease[]>(
              `${githubApiBase}/releases?per_page=100`,
              "froststrap-releases-100",
            );

            for (const release of releases) {
              asset = findAsset(release, extension);

              if (asset) {
                downloadRelease = release;
                break;
              }
            }
          }

          setDownloadUrl(asset?.browser_download_url ?? null);

          if (asset) {
            setReleaseData((previous) => ({
              ...previous,
              downloadVersion: downloadRelease.tag_name || "latest",
            }));
          }
        }

        const repository = await fetchGithub<GithubRepository>(
          githubApiBase,
          "froststrap-repository",
        );

        const releases = await fetchGithub<GithubRelease[]>(
          `${githubApiBase}/releases?per_page=100`,
          "froststrap-releases-100",
        );

        const totalDownloads = releases.reduce(
          (total, release) =>
            total +
            (release.assets?.reduce(
              (releaseTotal, asset) =>
                releaseTotal + (asset.download_count || 0),
              0,
            ) ?? 0),
          0,
        );

        setRepoStats({
          license: repository.license?.spdx_id || "Unknown",
          totalDownloads,
        });
      } catch (error) {
        console.error("Failed to fetch GitHub data:", error);

        setReleaseData((previous) => ({
          ...previous,
          version:
            previous.version === "loading..." ? "unknown" : previous.version,
        }));

        setRepoStats((previous) => ({
          ...previous,
          license: previous.license === "..." ? "Unknown" : previous.license,
        }));
      }
    };

    void loadGithubData();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-background text-foreground -z-10">
        <Snowfall
          snowflakeCount={100}
          speed={[1.0, 3.0]}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-6">
            <Link
              to="/"
              className="flex items-center gap-3 transition-opacity hover:opacity-80"
            >
              <img src={logo} alt="Froststrap" className="h-10 w-10" />

              <span className="text-xl font-bold">Froststrap</span>
            </Link>

            <nav className="flex items-center gap-4">
              <Button asChild variant="ghost" size="icon" className="h-9 w-9">
                <a
                  href="https://github.com/Froststrap/Froststrap"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <FaGithub className="h-5 w-5" />
                </a>
              </Button>

              <Button asChild variant="ghost" size="icon" className="h-9 w-9">
                <a
                  href="https://discord.gg/9nvJVuaqy4"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                >
                  <FaDiscord className="h-5 w-5" />
                </a>
              </Button>

              <div className="h-6 w-px bg-border" />

              <Link
                to="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-accent focus:text-white"
              >
                Home
              </Link>

              <Link
                to="/docs/faq"
                className="rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-accent focus:text-white"
              >
                FAQ
              </Link>

              <Link
                to="/docs"
                className="rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-accent focus:text-white"
              >
                Wiki
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="container z-10 py-16">
          {/* Hero Section */}
          <div className="mb-16 flex flex-col items-center space-y-6 text-center">
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt="Froststrap Logo"
                className="h-16 w-16 md:h-20 md:w-20"
              />

              <h1 className="text-5xl font-bold text-foreground md:text-6xl">
                Froststrap
              </h1>
            </div>

            <p className="z-10 max-w-2xl text-xl text-muted-foreground">
              A Fishstrap fork — crossplatform, lightweight, customizable, and
              open source.
            </p>

            <div className="z-10 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="flex items-center gap-2">
                <a
                  href={downloadUrl ?? "#"}
                  aria-disabled={!downloadUrl}
                  onClick={(event) => {
                    if (!downloadUrl) {
                      event.preventDefault();
                    }
                  }}
                >
                  {getPlatformIcon(platform)}

                  {downloadUrl
                    ? `Download Latest (${releaseData.downloadVersion})`
                    : "Loading..."}
                </a>
              </Button>

              <Button asChild size="lg" variant="secondary" className="gap-2">
                <a
                  href="https://github.com/Froststrap/Froststrap"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="h-5 w-5" />
                  <span>Star on GitHub</span>
                </a>
              </Button>
            </div>

            {/* Stats Badges */}
            <div className="z-10 flex flex-wrap justify-center gap-3">
              <a
                href="https://github.com/Froststrap/Froststrap/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-w-0 items-center gap-3 rounded-lg bg-secondary px-3 py-1.5 text-sm text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                <FileText className="h-5 w-5 shrink-0" />

                <span className="text-muted-foreground">|</span>

                <span className="text-xs text-muted-foreground">License</span>

                <span className="max-w-[8rem] truncate font-semibold text-primary">
                  {repoStats.license}
                </span>
              </a>

              <a
                href="https://github.com/Froststrap/Froststrap/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-w-0 items-center gap-3 rounded-lg bg-secondary px-3 py-1.5 text-sm text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                <CloudDownload className="h-5 w-5 shrink-0" />

                <span className="text-muted-foreground">|</span>

                <span className="text-xs text-muted-foreground">
                  Latest Downloads
                </span>

                <span className="max-w-[8rem] truncate font-semibold text-primary">
                  {formatCompactNumber(releaseData.latestDownloads)}
                </span>
              </a>

              <a
                href="https://github.com/Froststrap/Froststrap"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-w-0 items-center gap-3 rounded-lg bg-secondary px-3 py-1.5 text-sm text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                <Download className="h-5 w-5 shrink-0" />

                <span className="text-muted-foreground">|</span>

                <span className="text-xs text-muted-foreground">
                  Total Downloads
                </span>

                <span className="max-w-[8rem] truncate font-semibold text-primary">
                  {formatCompactNumber(repoStats.totalDownloads)}
                </span>
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <div className="z-10 grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="z-10 rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary">
              <div className="flex items-start gap-3">
                <Laptop className="h-6 w-6 shrink-0" />

                <div>
                  <h3 className="mb-1 text-xl font-semibold text-card-foreground">
                    Cross Platform
                  </h3>

                  <p className="text-muted-foreground">
                    Works seamlessly across Windows, macOS, and Linux.
                  </p>
                </div>
              </div>
            </div>

            <div className="z-10 rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary">
              <div className="flex items-start gap-3">
                <Settings className="h-6 w-6 shrink-0" />

                <div>
                  <h3 className="mb-1 text-xl font-semibold text-card-foreground">
                    Bootstrapper
                  </h3>

                  <p className="text-muted-foreground">
                    Lightweight launcher for Roblox with enhanced customization.
                  </p>
                </div>
              </div>
            </div>

            <div className="z-10 rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary">
              <div className="flex items-start gap-3">
                <Wrench className="h-6 w-6 shrink-0" />

                <div>
                  <h3 className="mb-1 text-xl font-semibold text-card-foreground">
                    Mod Generator
                  </h3>

                  <p className="text-muted-foreground">
                    Easily generate mods to use for Roblox UI.
                  </p>
                </div>
              </div>
            </div>

            <div className="z-10 rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary">
              <div className="flex items-start gap-3">
                <Palette className="h-6 w-6 shrink-0" />

                <div>
                  <h3 className="mb-1 text-xl font-semibold text-card-foreground">
                    UI & Appearance
                  </h3>

                  <p className="text-muted-foreground">
                    Customize UI with Custom Animated/Gradient backgrounds.
                  </p>
                </div>
              </div>
            </div>

            <div className="z-10 rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary">
              <div className="flex items-start gap-3">
                <Globe2 className="h-6 w-6 shrink-0" />

                <div>
                  <h3 className="mb-1 text-xl font-semibold text-card-foreground">
                    Region Selector
                  </h3>

                  <p className="text-muted-foreground">
                    Choose your preferred server region for optimal ping.
                  </p>
                </div>
              </div>
            </div>

            <div className="z-10 rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary">
              <div className="flex items-start gap-3">
                <Gamepad2 className="h-6 w-6 shrink-0" />

                <div>
                  <h3 className="mb-1 text-xl font-semibold text-card-foreground">
                    Game Shortcuts
                  </h3>

                  <p className="text-muted-foreground">
                    Create shortcuts to use to join specific games faster.
                  </p>
                </div>
              </div>
            </div>

            <div className="z-10 rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary">
              <div className="flex items-start gap-3">
                <MessageCircle className="h-6 w-6 shrink-0" />

                <div>
                  <h3 className="mb-1 text-xl font-semibold text-card-foreground">
                    Froststrap RPC
                  </h3>

                  <p className="text-muted-foreground">
                    Froststrap Rich Presence that also tracks the page you're
                    on.
                  </p>
                </div>
              </div>
            </div>

            <div className="z-10 rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary">
              <div className="flex items-start gap-3">
                <Users className="h-6 w-6 shrink-0" />

                <div>
                  <h3 className="mb-1 text-xl font-semibold text-card-foreground">
                    Account Manager
                  </h3>

                  <p className="text-muted-foreground">
                    Easily switch between accounts for extra functionality
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Credits */}
          <div className="mt-16 text-center text-muted-foreground">
            Founder & Developer:{" "}
            <span className="font-semibold text-foreground">Meddsam</span>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
          &copy; 2026 Froststrap. MPL 2.0 Licensed.
        </footer>
      </div>
    </>
  );
}
