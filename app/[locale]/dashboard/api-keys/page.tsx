"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslations, useLocale } from 'next-intl';
import { useSession } from "@clerk/react";
import {
    KeyRound,
    Plus,
    Copy,
    Check,
    Eye,
    EyeOff,
    ShieldOff,
    ShieldCheck,
    AlertTriangle,
} from "lucide-react";

import { RootState } from "@/store/rootStore";
import { fetchUserDetails, createApiKeyRequest, revokeApiKeyRequest, clearNewKey } from "../store/slice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

function MaskedKey({ value }: { value: string }) {
    const [visible, setVisible] = useState(false);
    const [copied, setCopied] = useState(false);

    const display = visible ? value : value.slice(0, 8) + "••••••••••••••••" + value.slice(-4);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center gap-2">
            <code className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded select-all">
                {display}
            </code>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setVisible((v) => !v)}>
                {visible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy}>
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            </Button>
        </div>
    );
}

export default function ApiKeysPage() {
    const t = useTranslations("DashboardPage");
    const dispatch = useDispatch();
    const { session } = useSession();
    const { userDetails, createApiKey, revokeApiKey } = useSelector((state: RootState) => state.dashboard);

    const [createOpen, setCreateOpen] = useState(false);
    const [revokeTarget, setRevokeTarget] = useState<string | null>(null);
    const [keyName, setKeyName] = useState("");
    const [newKeyVisible, setNewKeyVisible] = useState(false);
    const [newKeyCopied, setNewKeyCopied] = useState(false);

    const email = session?.user?.emailAddresses?.[0]?.emailAddress;

    useEffect(() => {
        if (email) {
            dispatch(fetchUserDetails({ email }));
        }
    }, [dispatch, email]);

    const handleCreate = () => {
        if (!keyName.trim() || !email) return;
        dispatch(createApiKeyRequest({ name: keyName.trim(), subscriptionId: userDetails.data?.subscription.id || "" }));
    };

    useEffect(() => {
        if (createApiKey.newKey) {
            setCreateOpen(false);
            setKeyName("");
        }
    }, [createApiKey.newKey]);

    const handleRevoke = () => {
        if (!revokeTarget) return;
        dispatch(revokeApiKeyRequest({ subscriptionId: userDetails.data?.subscription.id || "", apiKeyId: revokeTarget }));
        setRevokeTarget(null);
    };

    const handleCopyNewKey = () => {
        if (!createApiKey.newKey) return;
        navigator.clipboard.writeText(createApiKey.newKey);
        setNewKeyCopied(true);
        setTimeout(() => setNewKeyCopied(false), 2000);
    };

    const apiKeys = userDetails.data?.apiKeys ?? [];
    const activeCount = apiKeys.filter((k) => k.isActive).length;

    return (
        <div className="mx-auto max-w-5xl px-6 py-8 lg:px-8">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <div className="mb-3 flex items-center gap-2">
                        <KeyRound className="h-5 w-5 text-accent" />
                        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                            {t("API_KEYS")}
                        </h1>
                    </div>
                    <p className="max-w-lg text-sm text-muted-foreground">
                        {t("MANAGE_API_KEYS_DESCRIPTION")}
                    </p>
                </div>
                <Button onClick={() => setCreateOpen(true)} className="gap-2 self-start md:self-auto">
                    <Plus className="h-4 w-4" />
                    {t("CREATE_NEW_KEY")}
                </Button>
            </div>

            {/* Stats */}
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
                <Card className="border-border/70 bg-card/80">
                    <CardContent className="flex items-center gap-3 pt-5 pb-5">
                        <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600">
                            <ShieldCheck className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("ACTIVE_KEYS")}</p>
                            <p className="text-xl font-semibold">{activeCount}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border/70 bg-card/80">
                    <CardContent className="flex items-center gap-3 pt-5 pb-5">
                        <div className="rounded-xl bg-muted p-2.5 text-muted-foreground">
                            <KeyRound className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("TOTAL_KEYS")}</p>
                            <p className="text-xl font-semibold">{apiKeys.length}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border/70 bg-card/80">
                    <CardContent className="flex items-center gap-3 pt-5 pb-5">
                        <div className="rounded-xl bg-red-500/10 p-2.5 text-red-600">
                            <ShieldOff className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("REVOKED_KEYS")}</p>
                            <p className="text-xl font-semibold">{apiKeys.length - activeCount}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* New key banner */}
            {createApiKey.newKey && (
                <Alert className="mb-6 border-emerald-500/30 bg-emerald-500/5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <AlertTitle className="text-emerald-700">{t("NEW_API_KEY_CREATED")}</AlertTitle>
                    <AlertDescription className="mt-2">
                        <p className="mb-3 text-sm text-muted-foreground">
                            {t("COPY_THIS_KEY_NOW")}
                        </p>
                        <div className="flex items-center gap-2">
                            <code className="flex-1 rounded border border-border bg-background px-3 py-2 text-xs font-mono text-foreground break-all select-all">
                                {newKeyVisible ? createApiKey.newKey : createApiKey.newKey.slice(0, 12) + "••••••••••••••••"}
                            </code>
                            <Button variant="ghost" size="icon" onClick={() => setNewKeyVisible((v) => !v)}>
                                {newKeyVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                            <Button variant="outline" size="sm" onClick={handleCopyNewKey} className="gap-1.5">
                                {newKeyCopied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                                {newKeyCopied ? t("COPIED") : t("COPY")}
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => dispatch(clearNewKey())}>
                                {t("DISMISS")}
                            </Button>
                        </div>
                    </AlertDescription>
                </Alert>
            )}

            {/* Keys table */}
            <Card className="border-border/70">
                <CardHeader>
                    <CardTitle className="text-base">{t("YOUR_API_KEYS")}</CardTitle>
                    <CardDescription>
                        {t("USE_KEYS_TO_AUTHENTICATE")}
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    {userDetails.loading ? (
                        <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
                            {t("LOADING_KEYS")}
                        </div>
                    ) : apiKeys.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                            <KeyRound className="h-8 w-8 text-muted-foreground/40" />
                            <p className="text-sm text-muted-foreground">{t("NO_API_KEYS_YET")}</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t("NAME")}</TableHead>
                                    <TableHead>{t("KEY")}</TableHead>
                                    <TableHead>{t("STATUS")}</TableHead>
                                    <TableHead>{t("CREATED")}</TableHead>
                                    <TableHead className="text-right">{t("ACTIONS")}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {apiKeys.map((key) => (
                                    <TableRow key={key.id}>
                                        <TableCell className="font-medium">{key.name}</TableCell>
                                        <TableCell>
                                            {key.isActive ? (
                                                <MaskedKey value={key.apiKey} />
                                            ) : (
                                                <span className="text-xs font-mono text-muted-foreground/50 line-through">
                                                    {key.apiKey.slice(0, 8)}••••
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {key.isActive ? (
                                                <Badge variant="outline" className="gap-1.5 border-emerald-500/30 text-emerald-700 bg-emerald-500/5">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                    {t("ACTIVE")}
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="gap-1.5 border-red-500/30 text-red-600 bg-red-500/5">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                                    {t("REVOKED")}
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {new Date(key.createdAt).toLocaleDateString(undefined, {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {key.isActive && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => setRevokeTarget(key.id)}
                                                >
                                                    {t("REVOKE")}
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Create key dialog */}
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{t("CREATE_NEW_KEY")}</DialogTitle>
                        <DialogDescription>
                            {t("GIVE_KEY_DESCRIPTIVE_NAME")}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 py-2">
                        <Label htmlFor="key-name">{t("KEY_NAME")}</Label>
                        <Input
                            id="key-name"
                            placeholder={t("KEY_NAME_PLACEHOLDER")}
                            value={keyName}
                            onChange={(e) => setKeyName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                        />
                        {createApiKey.error && (
                            <p className="text-sm text-red-600">{createApiKey.error}</p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => { setCreateOpen(false); setKeyName(""); }}>
                            {t("CANCEL")}
                        </Button>
                        <Button
                            onClick={handleCreate}
                            disabled={!keyName.trim() || createApiKey.loading}
                        >
                            {createApiKey.loading ? <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                             : t("CREATE_KEY")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Revoke confirmation dialog */}
            <Dialog open={!!revokeTarget} onOpenChange={() => setRevokeTarget(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                            {t("REVOKE_API_KEY")}
                        </DialogTitle>
                        <DialogDescription>
                            {t("REVOKE_API_KEY_DESCRIPTION")}
                        </DialogDescription>
                    </DialogHeader>
                    {revokeApiKey.error && (
                        <p className="text-sm text-red-600">{revokeApiKey.error}</p>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setRevokeTarget(null)}>
                            {t("CANCEL")}
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleRevoke}
                            disabled={revokeApiKey.loading}
                        >
                            {revokeApiKey.loading ? t("REVOKING") : t("REVOKE_KEY")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
