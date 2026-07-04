# Troubleshooting

## Issue

CloudFront returned Access Denied.

### Cause

The default file origin was in blank, for some reason during the set up cloudfrount doesn't ask you for this and you have to manually change it in the general configuracion of your cloudfront distribution

### Solution

Add the "index.html" in the origin path file of cloudfront distribution