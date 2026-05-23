import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { filter, Subscription, map } from 'rxjs';
import { NewsService } from '../../services/news/news.service';
import { FeedArticle, GNewsArticle, NewsArticle } from '../../models/newsModels';



@Component({
  selector: 'app-news',
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit, OnDestroy{


  category = 'home';
  newsList: any[] = [];
  loading = false;
  error: string | null = null;

  private routerSub!: Subscription;

  constructor(
    private router: Router,
    private newsAPI: NewsService
  ) {}

  ngOnInit(): void {
    this.setCategoryFromUrlAndLoad(this.router.url);

    this.routerSub = this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe((evt: NavigationEnd) => {
        const url = evt.urlAfterRedirects || evt.url;
        this.setCategoryFromUrlAndLoad(url);
      });
  }

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  private setCategoryFromUrlAndLoad(url: string): void {
    const parts = url.split('/');
    const cat = parts[parts.length - 1] || 'latest';

    const validCategories = [
      'home',
      'latest',
      'pakistan',
      'sports',
      'politics',
      'health',
      'business',
      'world',
      'technology'
    ];    


    this.category = validCategories.includes(cat) ? cat : 'latest';
    this.loadFeedsForCategory(this.category);
  }


  newsArticles: NewsArticle[] = [];
  gNewsArticles: GNewsArticle[] = [];
  feeds: FeedArticle[] = [];

  loadFeedsForCategory(category: string): void {
    this.loading = true;
    this.error = null;
    this.newsList = [];

    const routeMap: Record<string, string> = {
      home: 'home',
      latest: 'breaking',
      pakistan: 'pakistan',
      sports: 'sports',
      politics: 'politics',
      health: 'health',
      business: 'business',
      world: 'world',
      technology: 'technology'
    };


    const apiCategory = routeMap[category] || 'home';

  this.newsAPI.getByCategory(apiCategory).subscribe({
    next: (res: any) => {

      if (Array.isArray(res.newsDataArticles)) {
        this.newsArticles = res.newsDataArticles.map((n: any) => ({
          title: n.title || 'No title',
          link: n.link || '#',
          description: n.description || '',
          pubDate: n.pubDate ? new Date(n.pubDate) : null,
          source: n.source_id || 'NewsData',
          image:
                n.image_url?.trim() ||
                n.image ||
                n.thumbnail ||
                null                      
        }));
      }

      if (Array.isArray(res.gNewsArticles)) {
        this.gNewsArticles = res.gNewsArticles.map((n: any) => ({
          title: n.title || 'No title',
          link: n.url || '#',
          description: n.description || '',
          pubDate: n.publishedAt ? new Date(n.publishedAt) : null,
          source: n.source?.name || 'GNews',
          image: n.image || null       
        }));
      }

      this.feeds = [];

      Object.keys(res).forEach(key => {
        if (key.toLowerCase().includes('feed') && Array.isArray(res[key])) {
          res[key].forEach((n: any) => {
            this.feeds.push({
              title: n.title || 'No title',
              link: n.link || '#',
              description: n.contentSnippet || n.content || '',
              pubDate: n.pubDate ? new Date(n.pubDate) : null,
              source: n.creator || n.source || 'RSS'
            });
          });
        }
      });

      const sortByDate = (a: any, b: any) =>
        (b.pubDate?.getTime() || 0) - (a.pubDate?.getTime() || 0);

      this.newsArticles.sort(sortByDate);
      this.gNewsArticles.sort(sortByDate);
      this.feeds.sort(sortByDate);

      this.loading = false;
    },

    error: (err: unknown) => {
      console.error('News fetch failed:', err);
      this.error = 'Failed to load news. Please try again later.';
      this.loading = false;
    }
  });


}

}
