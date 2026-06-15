import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function adminApiPlugin(): Plugin {
  return {
    name: 'admin-api',
    configureServer(server) {
      // Parse JSON bodies
      server.middlewares.use(async (req, res, next) => {
        if (req.method === 'POST' || req.method === 'PUT') {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              if (body) {
                (req as any).body = JSON.parse(body);
              }
            } catch (e) {
              console.error('Error parsing JSON body', e);
            }
            next();
          });
        } else {
          next();
        }
      });

      server.middlewares.use('/api/products', (req, res) => {
        const productsPath = path.resolve(__dirname, 'src/products.json');
        
        if (req.method === 'GET') {
          try {
            const data = fs.readFileSync(productsPath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to read products' }));
          }
        } 
        else if (req.method === 'POST') {
          try {
            const newProduct = (req as any).body;
            const data = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
            
            // Handle image upload if it's a base64 string
            if (newProduct.imageData && newProduct.imageData.startsWith('data:image')) {
              const matches = newProduct.imageData.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
              if (matches && matches.length === 3) {
                const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
                const buffer = Buffer.from(matches[2], 'base64');
                const fileName = `custom-${Date.now()}.${ext}`;
                const imagePath = path.resolve(__dirname, `public/images/categorias/${fileName}`);
                
                // Ensure directory exists
                const dir = path.dirname(imagePath);
                if (!fs.existsSync(dir)) {
                  fs.mkdirSync(dir, { recursive: true });
                }
                
                fs.writeFileSync(imagePath, buffer);
                newProduct.image = `/images/categorias/${fileName}`;
              }
              delete newProduct.imageData;
            }

            data.push(newProduct);
            fs.writeFileSync(productsPath, JSON.stringify(data, null, 2));
            
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, product: newProduct }));
          } catch (e) {
            console.error('Save error:', e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to save product' }));
          }
        }
        else if (req.method === 'DELETE') {
          try {
            const urlString = req.url || '';
            const searchParams = new URLSearchParams(urlString.split('?')[1] || '');
            const id = searchParams.get('id');
            if (!id) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Missing product id' }));
              return;
            }
            const data = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
            const newData = data.filter((p: any) => p.id !== id);
            fs.writeFileSync(productsPath, JSON.stringify(newData, null, 2));
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (e) {
            console.error('Delete error:', e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to delete product' }));
          }
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), adminApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
