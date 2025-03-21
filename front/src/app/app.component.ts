import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'news';
  load = true
  noticias: any[] = [];
readonly noticiasS = inject(ServiceService) 
ngOnInit(): void {
  this.noticiasS.obtenerNoticias().subscribe(response => {
    if (response.status === 'ok') {
      const noticiasConAutor = response.articles;

      noticiasConAutor.forEach((noticia: { autorNombre: string; autorFoto: any; }, index: any) => {
        this.noticiasS.getautor().subscribe((autorResponse: { results: any[]; }) => {
          const autor = autorResponse.results[0];
          noticia.autorNombre = `${autor.name.first} ${autor.name.last}`;
          noticia.autorFoto = autor.picture.medium;

          this.noticias.push(noticia);
          this.load = false
        });
      });
    }
  });
}

formatDate(fecha: string | null): string {
  if (!fecha) return 'Sin fecha';

  const date = new Date(fecha);
  if (isNaN(date.getTime())) return 'Fecha inválida';

  const opciones: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
   
  };

  return date.toLocaleString('es-ES', opciones);
}
}
