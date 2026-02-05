import { useState } from "react";
import { css } from "../../../styled-system/css";
import {
  playgroundModal,
  playgroundPanel,
  playgroundHeader,
  playgroundGrid,
  componentCard,
  mockComponent,
} from "../../../styled-system/recipes";
import { MorphIcon, Button } from "../../components";

const styles = {
  sectionTitle: css({
    textTransform: "uppercase",
    fontSize: "0.7rem",
    color: "{colors.textDim}",
    fontWeight: 700,
  }),
  description: css({
    fontSize: "0.75rem",
    color: "{colors.textMuted}",
    lineHeight: "1.4",
  }),
  headerTitle: css({
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "{colors.text}",
  }),
};

// Easing functions (Same as EditorViewport)

export default function ComponentPlayground({
  onClose,
  pathA,
  pathB,
  colorMode,
  solidColor,
  gradientStart,
  gradientEnd,
  duration,
  easing,
  renderMode,
}) {
  /* Icon config to pass to all MorphIcons */
  const iconConfig = {
    pathA,
    pathB,
    colorMode,
    solidColor,
    gradientStart,
    gradientEnd,
    duration,
    easing,
    renderMode,
  };

  const MockButton = () => {
    const [hover, setHover] = useState(false);
    return (
      <div className={componentCard()}>
        <div className={styles.sectionTitle}>Interactive Button</div>
        <button
          className={mockComponent()}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <MorphIcon {...iconConfig} isHovered={hover} />
          <span>Hover Me</span>
        </button>
        <div className={styles.description}>Standard button interaction.</div>
      </div>
    );
  };

  const MockInput = () => {
    const [focused, setFocused] = useState(false);
    return (
      <div className={componentCard()}>
        <div
          className={css({
            textTransform: "uppercase",
            fontSize: "0.7rem",
            color: "#666",
            fontWeight: 700,
          })}
        >
          Input Field
        </div>
        <div
          className={mockComponent()}
          style={{
            background: "#000",
            cursor: "text",
            border: focused ? "1px solid #A855F7" : "1px solid #333",
          }}
          onMouseEnter={() => setFocused(true)}
          onMouseLeave={() => setFocused(false)}
        >
          <div className={css({ color: "#555" })}>
            <MorphIcon {...iconConfig} isHovered={focused} />
          </div>
          <input
            type="text"
            placeholder="Focus/Hover..."
            className={css({
              background: "transparent",
              border: "none",
              color: "#fff",
              outline: "none",
              width: "100%",
              fontSize: "0.9rem",
            })}
            readOnly
          />
        </div>
        <div
          className={css({
            fontSize: "0.75rem",
            color: "#888",
            lineHeight: "1.4",
          })}
        >
          Input decoration that responds to focus.
        </div>
      </div>
    );
  };

  const MockTabs = () => {
    const [activeTab, setActiveTab] = useState(0);
    return (
      <div className={componentCard()}>
        <div
          className={css({
            textTransform: "uppercase",
            fontSize: "0.7rem",
            color: "#666",
            fontWeight: 700,
          })}
        >
          Tab Navigation
        </div>
        <div
          className={css({
            display: "flex",
            gap: "4px",
            background: "#000",
            padding: "4px",
            borderRadius: "8px",
          })}
        >
          {[0, 1].map((i) => (
            <div
              key={i}
              className={css({
                padding: "8px 16px",
                borderRadius: "6px",
                background: activeTab === i ? "#222" : "transparent",
                color: activeTab === i ? "#fff" : "#666",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.8rem",
                cursor: "pointer",
                transition: "all 0.2s",
                flex: 1,
                justifyContent: "center",
              })}
              onMouseEnter={() => setActiveTab(i)}
            >
              <MorphIcon {...iconConfig} isHovered={activeTab === i} />
              Tab {i + 1}
            </div>
          ))}
        </div>
        <div
          className={css({
            fontSize: "0.75rem",
            color: "#888",
            lineHeight: "1.4",
          })}
        >
          Active state indicator for tab bars.
        </div>
      </div>
    );
  };

  const MockToggle = () => {
    const [isOn, setIsOn] = useState(false);
    return (
      <div className={componentCard()}>
        <div
          className={css({
            textTransform: "uppercase",
            fontSize: "0.7rem",
            color: "#666",
            fontWeight: 700,
          })}
        >
          Toggle Switch
        </div>
        <div
          className={css({
            width: "50px",
            height: "28px",
            background: isOn ? "#A855F7" : "#333",
            borderRadius: "99px",
            position: "relative",
            cursor: "pointer",
            transition: "background 0.3s",
          })}
          onClick={() => setIsOn(!isOn)}
        >
          <div
            className={css({
              width: "24px",
              height: "24px",
              background: "#fff",
              borderRadius: "50%",
              position: "absolute",
              top: "2px",
              left: isOn ? "24px" : "2px",
              transition: "left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: isOn ? "#A855F7" : "#333",
            })}
          >
            <MorphIcon {...iconConfig} isHovered={isOn} size="14px" />
          </div>
        </div>
        <div
          className={css({
            fontSize: "0.75rem",
            color: "#888",
            lineHeight: "1.4",
          })}
        >
          Status icon inside a toggle knob.
        </div>
      </div>
    );
  };

  const MockActionCard = () => {
    const [liked, setLiked] = useState(false);
    return (
      <div className={componentCard()}>
        <div
          className={css({
            textTransform: "uppercase",
            fontSize: "0.7rem",
            color: "#666",
            fontWeight: 700,
          })}
        >
          Action Card
        </div>
        <div
          className={css({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#000",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #333",
          })}
        >
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            })}
          >
            <span
              className={css({
                color: "#fff",
                fontSize: "0.9rem",
                fontWeight: 600,
              })}
            >
              Super Item
            </span>
            <span className={css({ color: "#666", fontSize: "0.75rem" })}>
              $24.00
            </span>
          </div>
          <button
            className={css({
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: liked
                ? "rgba(168, 85, 247, 0.2)"
                : "rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
              color: liked ? "#A855F7" : "#fff",
              transition: "all 0.2s",
            })}
            onClick={() => setLiked(!liked)}
          >
            <MorphIcon {...iconConfig} isHovered={liked} />
          </button>
        </div>
        <div
          className={css({
            fontSize: "0.75rem",
            color: "#888",
            lineHeight: "1.4",
          })}
        >
          Favorite/Save action button state.
        </div>
      </div>
    );
  };

  const MockNavItem = () => {
    const [hover, setHover] = useState(false);
    return (
      <div className={componentCard()}>
        <div
          className={css({
            textTransform: "uppercase",
            fontSize: "0.7rem",
            color: "#666",
            fontWeight: 700,
          })}
        >
          Navigation Item
        </div>
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            background: hover ? "rgba(168, 85, 247, 0.1)" : "transparent",
            color: hover ? "#A855F7" : "#888",
            transition: "all 0.2s",
            fontWeight: 500,
          })}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <MorphIcon {...iconConfig} isHovered={hover} />
          <span>Dashboard</span>
        </div>
        <div
          className={css({
            fontSize: "0.75rem",
            color: "#888",
            lineHeight: "1.4",
          })}
        >
          Sidebar or menu link hover effect.
        </div>
      </div>
    );
  };

  const MockFAB = () => {
    const [hover, setHover] = useState(false);
    return (
      <div className={componentCard()}>
        <div
          className={css({
            textTransform: "uppercase",
            fontSize: "0.7rem",
            color: "#666",
            fontWeight: 700,
          })}
        >
          Floating Action
        </div>
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            padding: "10px",
          })}
        >
          <button
            className={css({
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "#1a1a1a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #333",
              cursor: "pointer",
              boxShadow: "0 8px 16px -4px rgba(0, 0, 0, 0.3)",
              transition: "transform 0.2s, background 0.2s",
              _hover: { transform: "scale(1.05)", background: "#222" },
            })}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <MorphIcon {...iconConfig} isHovered={hover} size="24px" />
          </button>
        </div>
        <div
          className={css({
            fontSize: "0.75rem",
            color: "#888",
            lineHeight: "1.4",
          })}
        >
          Primary action button emphasis.
        </div>
      </div>
    );
  };

  const MockAccordion = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className={componentCard()}>
        <div
          className={css({
            textTransform: "uppercase",
            fontSize: "0.7rem",
            color: "#666",
            fontWeight: 700,
          })}
        >
          Accordion Header
        </div>
        <div
          className={css({
            border: "1px solid #333",
            borderRadius: "8px",
            overflow: "hidden",
            background: "#0a0a0a",
          })}
        >
          <div
            className={css({
              padding: "12px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              background: "#151515",
              _hover: { background: "#1a1a1a" },
            })}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={css({ fontSize: "0.9rem", color: "#eee" })}>
              Details
            </span>
            <div
              className={css({
                color: "#888",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              })}
            >
              <MorphIcon {...iconConfig} isHovered={isOpen} size="16px" />
            </div>
          </div>
          {isOpen && (
            <div
              className={css({
                padding: "12px 16px",
                color: "#888",
                fontSize: "0.8rem",
                borderTop: "1px solid #333",
              })}
            >
              Content visible when expanded...
            </div>
          )}
        </div>
        <div
          className={css({
            fontSize: "0.75rem",
            color: "#888",
            lineHeight: "1.4",
          })}
        >
          Chevron rotation or icon swap on expand.
        </div>
      </div>
    );
  };

  const MockBadge = () => {
    const [active, setActive] = useState(false);
    return (
      <div className={componentCard()}>
        <div
          className={css({
            textTransform: "uppercase",
            fontSize: "0.7rem",
            color: "#666",
            fontWeight: 700,
          })}
        >
          Status Badge
        </div>
        <div className={css({ display: "flex", gap: "8px", flexWrap: "wrap" })}>
          <div
            className={css({
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              borderRadius: "99px",
              background: active
                ? "rgba(168, 85, 247, 0.15)"
                : "rgba(100,100,100,0.1)",
              color: active ? "#A855F7" : "#888",
              fontSize: "0.75rem",
              fontWeight: 600,
              cursor: "pointer",
              border: "1px solid",
              borderColor: active ? "rgba(168, 85, 247, 0.3)" : "transparent",
              transition: "all 0.2s",
            })}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
          >
            <MorphIcon {...iconConfig} isHovered={active} size="12px" />
            {active ? "Completed" : "Pending"}
          </div>
        </div>
        <div
          className={css({
            fontSize: "0.75rem",
            color: "#888",
            lineHeight: "1.4",
          })}
        >
          Status indicator pill.
        </div>
      </div>
    );
  };

  const MockCheckbox = () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className={componentCard()}>
        <div
          className={css({
            textTransform: "uppercase",
            fontSize: "0.7rem",
            color: "#666",
            fontWeight: 700,
          })}
        >
          Checkbox
        </div>
        <label
          className={css({
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "6px",
            _hover: { background: "rgba(255,255,255,0.02)" },
          })}
        >
          <div
            className={css({
              width: "20px",
              height: "20px",
              borderRadius: "4px",
              border: "2px solid",
              borderColor: checked ? "#A855F7" : "#444",
              background: checked ? "rgba(168, 85, 247, 0.1)" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
              color: checked ? "#A855F7" : "#444",
            })}
            onClick={() => setChecked(!checked)}
          >
            <MorphIcon {...iconConfig} isHovered={checked} size="14px" />
          </div>
          <span className={css({ fontSize: "0.9rem", color: "#ccc" })}>
            Accept terms
          </span>
        </label>
        <div
          className={css({
            fontSize: "0.75rem",
            color: "#888",
            lineHeight: "1.4",
          })}
        >
          Checkbox with icon state indicator.
        </div>
      </div>
    );
  };

  const MockAlert = () => {
    const [hover, setHover] = useState(false);
    return (
      <div className={componentCard()}>
        <div
          className={css({
            textTransform: "uppercase",
            fontSize: "0.7rem",
            color: "#666",
            fontWeight: 700,
          })}
        >
          Alert Banner
        </div>
        <div
          className={css({
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            padding: "12px",
            borderRadius: "8px",
            background: "rgba(168, 85, 247, 0.05)",
            border: "1px solid rgba(168, 85, 247, 0.2)",
            cursor: "pointer",
            transition: "all 0.2s",
            _hover: { background: "rgba(168, 85, 247, 0.08)" },
          })}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div
            className={css({
              color: "#A855F7",
              flexShrink: 0,
              paddingTop: "2px",
            })}
          >
            <MorphIcon {...iconConfig} isHovered={hover} size="18px" />
          </div>
          <div className={css({ flex: 1 })}>
            <div
              className={css({
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#eee",
                marginBottom: "2px",
              })}
            >
              Update Available
            </div>
            <div className={css({ fontSize: "0.75rem", color: "#999" })}>
              A new version is ready to install.
            </div>
          </div>
        </div>
        <div
          className={css({
            fontSize: "0.75rem",
            color: "#888",
            lineHeight: "1.4",
          })}
        >
          Alert/notification with leading icon.
        </div>
      </div>
    );
  };

  const MockMenuItem = () => {
    const [hover, setHover] = useState(false);
    return (
      <div className={componentCard()}>
        <div
          className={css({
            textTransform: "uppercase",
            fontSize: "0.7rem",
            color: "#666",
            fontWeight: 700,
          })}
        >
          Menu Item
        </div>
        <div
          className={css({
            background: "#0a0a0a",
            border: "1px solid #222",
            borderRadius: "8px",
            padding: "4px",
            minWidth: "180px",
          })}
        >
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              background: hover ? "rgba(168, 85, 247, 0.1)" : "transparent",
              color: hover ? "#A855F7" : "#aaa",
              transition: "all 0.15s",
              fontSize: "0.85rem",
            })}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <MorphIcon {...iconConfig} isHovered={hover} size="16px" />
            <span>Settings</span>
            <span
              className={css({
                marginLeft: "auto",
                fontSize: "0.7rem",
                color: "#666",
              })}
            >
              ⌘,
            </span>
          </div>
        </div>
        <div
          className={css({
            fontSize: "0.75rem",
            color: "#888",
            lineHeight: "1.4",
          })}
        >
          Dropdown menu item with icon.
        </div>
      </div>
    );
  };

  return (
    <div className={playgroundModal()} onClick={onClose}>
      <div className={playgroundPanel()} onClick={(e) => e.stopPropagation()}>
        <div className={playgroundHeader()}>
          <div className={styles.headerTitle}>Component Playground</div>
          <Button variant="ghost" onClick={onClose}>
            ✕ Close
          </Button>
        </div>

        <div className={playgroundGrid()}>
          <MockButton />
          <MockInput />
          <MockTabs />
          <MockToggle />
          <MockActionCard />
          <MockNavItem />
          <MockFAB />
          <MockAccordion />
          <MockBadge />
          <MockCheckbox />
          <MockAlert />
          <MockMenuItem />
        </div>
      </div>
    </div>
  );
}
