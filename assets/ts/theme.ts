export class ThemeManager {
    private static instance: ThemeManager;
    private switches: HTMLInputElement[] = [];

    private constructor() {
        this.init();
    }

    public static getInstance(): ThemeManager {
        if (!ThemeManager.instance) {
            ThemeManager.instance = new ThemeManager();
        }
        return ThemeManager.instance;
    }

    private getSystemTheme(): 'light' | 'dark' {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    private getCurrentTheme(): 'light' | 'dark' {
        const saved = localStorage.getItem('theme');
        return (saved as 'light' | 'dark') || this.getSystemTheme();
    }

    public setTheme(theme: 'light' | 'dark'): void {
        localStorage.setItem('theme', theme);
        this.applyTheme(theme);
    }

    public toggleTheme(): void {
        const current = this.getCurrentTheme();
        this.setTheme(current === 'dark' ? 'light' : 'dark');
    }

    private applyTheme(theme: 'light' | 'dark'): void {
        document.documentElement.setAttribute('data-bs-theme', theme);
        this.switches.forEach(switchEl => {
            switchEl.checked = theme === 'dark';
        });
    }

    public registerSwitch(switchEl: HTMLInputElement): void {
        switchEl.checked = this.getCurrentTheme() === 'dark';
        switchEl.addEventListener('change', () => {
            this.setTheme(switchEl.checked ? 'dark' : 'light');
        });
        this.switches.push(switchEl);
    }

    private init(): void {
        this.applyTheme(this.getCurrentTheme());

        // Слушаем системные изменения
        if (!localStorage.getItem('theme')) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                if (!localStorage.getItem('theme')) {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }
}