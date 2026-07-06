import { Component, OnInit, AfterViewInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Restaurant } from '../../../models/Restaurant';
import { Restaurantservice } from '../../../services/restaurantservice';
import { Loginservice } from '../../../services/loginservice'; // 1. Importamos tu servicio de Login
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Event, NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';

declare const google: any;

@Component({
  selector: 'app-restaurantlist',
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './restaurantlist.html',
  styleUrl: './restaurantlist.css',
})
export class Restaurantlist implements OnInit, AfterViewInit, OnDestroy {
  dataSource: MatTableDataSource<Restaurant> = new MatTableDataSource();
  restaurantes: Restaurant[] = [];
  role: string = ''; // 2. Propiedad para almacenar el rol actual

  // Google Maps
  map: any = null;
  markers: any[] = [];
  mapsLoaded = false;

  // Búsqueda con IA
  searchQuery: string = '';
  aiResults: Restaurant[] = [];
  isSearching: boolean = false;
  searchDone: boolean = false;
  errorMsg: string = '';

  displayedColumns: string[] = [
    'restaurantid',
    'name',
    'address',
    'ratingAvg',
    'webUrl',
    'googleMapsUrl',
    'latitude',
    'longitude',
    'nombreCategoria',
    'actions',
  ];

  constructor(
    private rS: Restaurantservice,
    private loginService: Loginservice, // 3. Inyectamos el Loginservice
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // 4. Obtenemos el rol actual al inicializar el componente
    this.role = this.loginService.showRole() ?? '';

    this.cargarRestaurantes();
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.cargarRestaurantes();
      }
    });
  }

  // 5. Métodos de control de roles requeridos por el HTML
  isAdmin(): boolean {
    return this.role === 'ROLE_ADMIN';
  }

  isOwner(): boolean {
    return this.role === 'ROLE_OWNER';
  }

  isUser(): boolean {
    return this.role === 'ROLE_USER';
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleMapsScript();
    }
  }

  ngOnDestroy(): void {
    this.markers.forEach((m) => m.setMap(null));
  }

  cargarRestaurantes() {
  // REFUERZO: Volvemos a leer el rol justo cuando se solicita o refresca la lista
  const rolActual = this.loginService.showRole();
  this.role = rolActual ? rolActual.toUpperCase().trim() : '';

  this.rS.list().subscribe({
    next: (data: Restaurant[]) => {
      this.restaurantes = data;
      this.dataSource.data = data;
      
      // Una vez que los datos llegan, aseguramos que el rol esté actualizado antes de pintar los renglones
      const rolPostCarga = this.loginService.showRole();
      this.role = rolPostCarga ? rolPostCarga.toUpperCase().trim() : '';

      if (this.mapsLoaded && this.map) {
        this.placemarkers(data);
      }
    },
    error: (err: unknown) => console.error('Error al cargar restaurantes', err),
  });
}

  eliminar(id: number) {
    this.rS.delete(id).subscribe(() => {
      this.cargarRestaurantes();
    });
  }

  // ──────────────── GOOGLE MAPS ────────────────

  loadGoogleMapsScript() {
    if ((window as any)['google']?.maps) {
      this.mapsLoaded = true;
      this.initMap();
      return;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsKey}&callback=initGoogleMap`;
    script.async = true;
    script.defer = true;

    (window as any)['initGoogleMap'] = () => {
      this.mapsLoaded = true;
      this.initMap();
    };
    document.head.appendChild(script);
  }

  initMap() {
    const mapEl = document.getElementById('restaurantMap');
    if (!mapEl) return;

    this.map = new google.maps.Map(mapEl, {
      center: { lat: 4.711, lng: -74.0721 }, // Bogotá por defecto
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false,
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
        { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
        { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
        { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9d6e3' }] },
      ],
    });

    if (this.restaurantes.length > 0) {
      this.placemarkers(this.restaurantes);
    }
  }

  placemarkers(restaurants: Restaurant[]) {
    this.markers.forEach((m) => m.setMap(null));
    this.markers = [];

    if (!this.map) return;

    const bounds = new google.maps.LatLngBounds();

    restaurants.forEach((r) => {
      if (!r.latitude || !r.longitude) return;

      const position = { lat: r.latitude, lng: r.longitude };

      const marker = new google.maps.Marker({
        position,
        map: this.map,
        title: r.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#c0392b',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });

      const infoContent = `
        <div style="font-family: 'Inter', sans-serif; padding: 8px; max-width: 220px;">
          <h3 style="margin: 0 0 6px; color: #c0392b; font-size: 15px;">${r.name}</h3>
          <p style="margin: 0 0 4px; font-size: 13px; color: #555;">📍 ${r.address || 'Sin dirección'}</p>
          <p style="margin: 0 0 6px; font-size: 13px;">⭐ ${r.ratingAvg ?? 'N/A'} / 5</p>
          ${r.googleMapsUrl ? `<a href="${r.googleMapsUrl}" target="_blank" style="color:#c0392b; font-size:12px;">Ver en Google Maps →</a>` : ''}
        </div>
      `;

      const infoWindow = new google.maps.InfoWindow({ content: infoContent });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });

      this.markers.push(marker);
      bounds.extend(position);
    });

    if (!bounds.isEmpty()) {
      this.map.fitBounds(bounds);
    }
  }

  // ──────────────── BÚSQUEDA IA (GEMINI) ────────────────

  async buscarConIA() {
    if (!this.searchQuery.trim() || this.restaurantes.length === 0) return;

    this.isSearching = true;
    this.searchDone = false;
    this.errorMsg = '';
    this.aiResults = [];

    const listaTexto = this.restaurantes
      .map(
        (r, i) =>
          `${i + 1}. ID:${r.restaurantid} | Nombre: "${r.name}" | Dirección: "${r.address}" | Rating: ${r.ratingAvg ?? 'N/A'} | Categoría ID: ${r.idCategory}`
      )
      .join('\n');

    const prompt = `
Eres un asistente de recomendación de restaurantes. Se te proporciona una lista de restaurantes disponibles y una consulta del usuario.

LISTA DE RESTAURANTES:
${listaTexto}

CONSULTA DEL USUARIO: "${this.searchQuery}"

Tu tarea: Devuelve ÚNICAMENTE un array JSON con los IDs (campo "ID") de los restaurantes que mejor coincidan con la consulta del usuario.
Responde SOLO con el array JSON, sin texto adicional, sin markdown. Ejemplo: [1, 3, 5]
Si ninguno coincide, devuelve: []
    `.trim();

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${environment.geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err?.error?.message || 'Error en la API de Gemini');
      }

      const data = await response.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '[]';
      const cleaned = raw.replace(/```json|```/g, '').trim();
      const ids: number[] = JSON.parse(cleaned);

      this.aiResults = this.restaurantes.filter((r) => ids.includes(r.restaurantid));
      if (this.aiResults.length > 0) {
        this.placemarkers(this.aiResults);
      }
    } catch (e: any) {
      console.error('Error al consultar Gemini:', e);
      this.errorMsg = 'Error al consultar la IA. Verifica la consola.';
    } finally {
      this.isSearching = false;
      this.searchDone = true;
    }
  }

  limpiarBusqueda() {
    this.searchQuery = '';
    this.aiResults = [];
    this.searchDone = false;
    this.errorMsg = '';
    this.placemarkers(this.restaurantes);
  }
}