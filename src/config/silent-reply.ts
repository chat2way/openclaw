import {
  classifySilentReplyConversationType,
  resolveSilentReplyPolicyFromPolicies,
  resolveSilentReplyRewriteFromPolicies,
  type SilentReplyConversationType,
  type SilentReplyPolicy,
} from "../shared/silent-reply-policy.js";
import { normalizeLowercaseStringOrEmpty } from "../shared/string-coerce.js";
import type { OpenClawConfig } from "./types.openclaw.js";

type ResolveSilentReplyParams = {
  cfg?: OpenClawConfig;
  sessionKey?: string;
  surface?: string;
  conversationType?: SilentReplyConversationType;
};

export function resolveSilentReplyPolicy(params: ResolveSilentReplyParams): SilentReplyPolicy {
  const conversationType = classifySilentReplyConversationType({
    sessionKey: params.sessionKey,
    surface: params.surface,
    conversationType: params.conversationType,
  });
  const normalizedSurface = normalizeLowercaseStringOrEmpty(params.surface);
  return resolveSilentReplyPolicyFromPolicies({
    conversationType,
    defaultPolicy: params.cfg?.agents?.defaults?.silentReply,
    surfacePolicy: normalizedSurface
      ? params.cfg?.surfaces?.[normalizedSurface]?.silentReply
      : undefined,
  });
}

export function resolveSilentReplyRewriteEnabled(params: ResolveSilentReplyParams): boolean {
  const conversationType = classifySilentReplyConversationType({
    sessionKey: params.sessionKey,
    surface: params.surface,
    conversationType: params.conversationType,
  });
  const normalizedSurface = normalizeLowercaseStringOrEmpty(params.surface);
  return resolveSilentReplyRewriteFromPolicies({
    conversationType,
    defaultRewrite: params.cfg?.agents?.defaults?.silentReplyRewrite,
    surfaceRewrite: normalizedSurface
      ? params.cfg?.surfaces?.[normalizedSurface]?.silentReplyRewrite
      : undefined,
  });
}
