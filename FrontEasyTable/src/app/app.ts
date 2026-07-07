import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Menucomponent } from './components/menucomponent/menucomponent';
import { TranslateService } from './services/translate.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menucomponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('FrontEasyTable');

  constructor(
    protected translateService: TranslateService,
    private router: Router
  ) {
    // Cada vez que cambia de ruta, si el modo inglés está activo,
    // vuelve a traducir el contenido nuevo que cargó el router.
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Se espera un tick para que Angular termine de pintar la vista nueva
        setTimeout(() => this.translateService.reapplyIfActive(), 100);
      });
  }

  toggleTranslation(): void {
    this.translateService.toggleLanguage();
  }
}
